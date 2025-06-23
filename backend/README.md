# Admin Panel Backend

This is the Flask backend for the Admin Panel application with real-time monitoring and approval system.

## Features

- Real-time login attempt monitoring
- Admin approval workflow
- OTP verification
- Activity logging
- WebSocket support for real-time updates
- Device fingerprinting
- Session management

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed

4. Run the development server:
   ```bash
   python app.py
   ```
   The server will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/login` - Submit login attempt
- `POST /api/approve-login/<attempt_id>` - Approve login attempt (admin)
- `POST /api/deny-login/<attempt_id>` - Deny login attempt (admin)
- `POST /api/request-otp/<attempt_id>` - Request OTP verification (admin)

### Monitoring
- `GET /api/login-attempts` - List all login attempts (admin)
- `GET /api/activity-logs` - View activity logs (admin)

## WebSocket Events

### Admin Dashboard
- Connect to: `ws://localhost:5000/socket.io/?type=admin`
- Events:
  - `new_login_attempt`: New login attempt detected
  - `activity_update`: New activity log entry
  - `login_approved`: Login was approved
  - `login_denied`: Login was denied
  - `otp_required`: OTP verification required

### Client
- Connect to: `ws://localhost:5000/socket.io/`
- Events:
  - `login_approved`: Login was approved
  - `login_denied`: Login was denied
  - `otp_required`: OTP verification required

## Security Notes

- Always use HTTPS in production
- Store sensitive data in environment variables
- Use a proper database in production
- Implement rate limiting
- Set appropriate CORS policies
- Keep dependencies updated
