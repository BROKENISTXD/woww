import React, { useState, useEffect } from 'react';
import { Bell, Check, X, RefreshCw, Shield, Clock, AlertTriangle, Activity, List } from 'lucide-react';
import ActivityLog from './ActivityLog';

// Mock data for login attempts
const initialLoginAttempts = [
  { id: 1, username: 'john.doe@example.com', ip: '192.168.1.1', timestamp: new Date().toISOString(), status: 'pending', device: 'Chrome / Windows' },
  { id: 2, username: 'jane.smith@example.com', ip: '192.168.1.2', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'approved', device: 'Safari / macOS' },
  { id: 3, username: 'robert.johnson@example.com', ip: '192.168.1.3', timestamp: new Date(Date.now() - 300000).toISOString(), status: 'denied', device: 'Firefox / Linux' },
  { id: 4, username: 'sarah.williams@example.com', ip: '192.168.1.4', timestamp: new Date(Date.now() - 600000).toISOString(), status: 'reset_requested', device: 'Edge / Windows' },
  { id: 5, username: 'michael.brown@example.com', ip: '192.168.1.5', timestamp: new Date(Date.now() - 900000).toISOString(), status: 'otp_requested', device: 'Chrome / Android' },
];

const AdminPanel: React.FC = () => {
  const [loginAttempts, setLoginAttempts] = useState(initialLoginAttempts);
  const [selectedAttempt, setSelectedAttempt] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'reset' | 'otp' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' | null }>({ message: '', type: null });
  const [sessionTimeout, setSessionTimeout] = useState(15 * 60); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(true);

  // Handle session timeout
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && sessionTimeout > 0) {
      interval = setInterval(() => {
        setSessionTimeout(prev => prev - 1);
      }, 1000) as unknown as number;
    } else if (sessionTimeout === 0) {
      setNotification({ message: 'Session expired due to inactivity', type: 'warning' });
      setIsActive(false);
      // In a real app, you would redirect to login page or lock the interface
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, sessionTimeout]);

  // Reset timeout on user activity
  useEffect(() => {
    const resetTimeout = () => {
      if (isActive) {
        setSessionTimeout(15 * 60);
      }
    };
    
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);
    window.addEventListener('click', resetTimeout);
    
    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keypress', resetTimeout);
      window.removeEventListener('click', resetTimeout);
    };
  }, [isActive]);

  // Simulate receiving new login attempts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAttempt = {
          id: Date.now(),
          username: `user${Math.floor(Math.random() * 1000)}@example.com`,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date().toISOString(),
          status: 'pending',
          device: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)] + ' / ' + 
                 ['Windows', 'macOS', 'Linux', 'Android', 'iOS'][Math.floor(Math.random() * 5)]
        };
        
        setLoginAttempts(prev => [newAttempt, ...prev]);
        
        // Play notification sound and show notification
        playNotificationSound();
        setNotification({ 
          message: `New login attempt: ${newAttempt.username}`, 
          type: 'warning' 
        });
        
        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification({ message: '', type: null });
        }, 5000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const playNotificationSound = () => {
    // In a real implementation, you would play a sound here
    console.log('Playing notification sound');
  };

  const handleAction = (id: number, action: 'approve' | 'deny' | 'reset' | 'otp') => {
    setSelectedAttempt(id);
    
    if (action === 'approve' || action === 'deny') {
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === id 
            ? { ...attempt, status: action === 'approve' ? 'approved' : 'denied' } 
            : attempt
        )
      );
      
      setNotification({ 
        message: `Login ${action === 'approve' ? 'approved' : 'denied'} for ${loginAttempts.find(a => a.id === id)?.username}`, 
        type: action === 'approve' ? 'success' : 'error' 
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification({ message: '', type: null });
      }, 5000);
    } else if (action === 'reset') {
      setModalType('reset');
      setShowModal(true);
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === id 
            ? { ...attempt, status: 'reset_requested' } 
            : attempt
        )
      );
    } else if (action === 'otp') {
      setModalType('otp');
      setShowModal(true);
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === id 
            ? { ...attempt, status: 'otp_requested' } 
            : attempt
        )
      );
    }
  };

  const handleModalSubmit = () => {
    if (!selectedAttempt) return;
    
    if (modalType === 'reset') {
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === selectedAttempt 
            ? { ...attempt, status: 'reset_completed' } 
            : attempt
        )
      );
      setNotification({ 
        message: `Password reset completed for ${loginAttempts.find(a => a.id === selectedAttempt)?.username}`, 
        type: 'success' 
      });
    } else if (modalType === 'otp') {
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === selectedAttempt 
            ? { ...attempt, status: 'otp_verified' } 
            : attempt
        )
      );
      setNotification({ 
        message: `OTP verification completed for ${loginAttempts.find(a => a.id === selectedAttempt)?.username}`, 
        type: 'success' 
      });
    }
    
    setShowModal(false);
    setInputValue('');
    setModalType(null);
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification({ message: '', type: null });
    }, 5000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'denied':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Denied</span>;
      case 'reset_requested':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Reset Requested</span>;
      case 'reset_completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Reset Completed</span>;
      case 'otp_requested':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">OTP Requested</span>;
      case 'otp_verified':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">OTP Verified</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Santander Security Admin Panel</h1>
          </div>
          <div className="flex items-center">
            <div className="mr-4 bg-red-700 px-3 py-1 rounded-md flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Session: {formatTime(sessionTimeout)}</span>
            </div>
            <button 

      {/* Details Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="attempt-details-modal"
        aria-describedby="attempt-details-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
          <Typography id="attempt-details-modal" variant="h6" component="h2" gutterBottom>
            {selectedAttempt ? 'Login Attempt Details' : 'Action Confirmation'}
          </Typography>
          
          {selectedAttempt ? (
            <Box id="attempt-details-description" sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Username</Typography>
                <Typography>{selectedAttempt.username}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Device</Typography>
                <Typography>{selectedAttempt.device}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">IP Address</Typography>
                <Typography>{selectedAttempt.ip}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Time</Typography>
                <Typography>{new Date(selectedAttempt.timestamp).toLocaleString()}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Status</Typography>
                {getStatusChip(selectedAttempt.status)}
              </Box>
            </Box>
          ) : (
            <Typography id="action-confirmation-description" sx={{ mt: 2 }}>
              {modalMessage}
            </Typography>
          )}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={() => setModalOpen(false)}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminPanel;