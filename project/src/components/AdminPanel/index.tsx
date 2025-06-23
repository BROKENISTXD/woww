import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  AlertColor
} from '@mui/material';
import {
  Check as ApproveIcon,
  Close as DenyIcon,
  Sms as OtpIcon,
  VpnKey as ResetIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
  SmsFailed as SmsFailedIcon,
  VpnKeyOff as VpnKeyOffIcon,
  HourglassEmpty as HourglassEmptyIcon,
  ContentCopy as ContentCopyIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import type { Socket } from 'socket.io-client';

type LoginStatus = 'pending' | 'approved' | 'denied' | 'otp_required' | 'otp_verified' | 'reset_required' | 'pending_security_verification' | 'security_verified';
type SnackbarSeverity = AlertColor;

interface LoginAttempt {
  id: string;
  username: string;
  device: string;
  ip: string;
  timestamp: string;
  status: LoginStatus;
  isLoading?: boolean;
  phoneNumber?: string;
  otpCode?: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

interface AdminPanelProps {
  socket: Socket | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ socket }) => {
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<LoginAttempt | null>(null);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Fetch initial login attempts
  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await fetch('/api/login-attempts', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLoginAttempts(data.attempts || []);
      } catch (error) {
        console.error('Failed to fetch login attempts:', error);
        showSnackbar('Failed to load login attempts. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttempts();

    // Set up WebSocket listeners
    const handleNewAttempt = (attempt: LoginAttempt) => {
      setLoginAttempts(prev => [attempt, ...prev]);
    };

    const handleAttemptUpdated = (updatedAttempt: LoginAttempt) => {
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === updatedAttempt.id ? { ...updatedAttempt, isLoading: false } : attempt
        )
      );
    };

    socket.on('new_login_attempt', handleNewAttempt);
    socket.on('login_attempt_updated', handleAttemptUpdated);

    return () => {
      socket.off('new_login_attempt', handleNewAttempt);
      socket.off('login_attempt_updated', handleAttemptUpdated);
    };
  }, [socket]);

  const handleAdminAction = async (attemptId: string, action: string) => {
    if (!socket) {
      showSnackbar('Connection error. Please refresh the page and try again.', 'error');
      return;
    }

    try {
      // Update local state optimistically
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === attemptId 
            ? { ...attempt, isLoading: true }
            : attempt
        )
      );

      if (action === 'request_otp') {
        handleRequestOtp(loginAttempts.find(a => a.id === attemptId) as LoginAttempt);
        return;
      }

      // For other actions
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );

      const actionPromise = new Promise<void>((resolve, reject) => {
        socket.emit('admin_action', { 
          attemptId, 
          action,
          timestamp: new Date().toISOString()
        }, (response: { success: boolean; message?: string }) => {
          if (response.success) {
            resolve();
          } else {
            reject(new Error(response.message || 'Action failed'));
          }
        });
      });

      await Promise.race([actionPromise, timeoutPromise]);

      // Show success message
      const attempt = loginAttempts.find(a => a.id === attemptId);
      setSelectedAttempt(attempt || null);
      showSnackbar(`Action "${action.replace('_', ' ')}" has been processed for ${attempt?.username}`, 'success');
    } catch (error) {
      console.error('Failed to process action:', error);
      // Revert optimistic update on error
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === attemptId 
            ? { ...attempt, isLoading: false }
            : attempt
        )
      );
      showSnackbar(`Failed to process action: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  // Handle OTP request
  const handleRequestOtp = (attempt: LoginAttempt) => {
    if (!socket) return;
    
    // Set loading state for this attempt
    setLoginAttempts(prev => prev.map(a => 
      a.id === attempt.id ? { ...a, isLoading: true } : a
    ));
    
    // Emit event to request OTP
    socket.emit('request_otp', { attemptId: attempt.id });
    
    // Show success message
    showSnackbar('OTP requested successfully', 'success');
    
    // Reset loading state after a delay
    setTimeout(() => {
      setLoginAttempts(prev => prev.map(a => 
        a.id === attempt.id ? { ...a, isLoading: false } : a
      ));
    }, 2000);
  };
  
  const handleSecurityVerification = (attempt: LoginAttempt) => {
    if (!socket) return;
    
    // Set loading state for this attempt
    setLoginAttempts(prev => prev.map(a => 
      a.id === attempt.id ? { ...a, isLoading: true } : a
    ));
    
    // Update attempt status to pending security verification
    socket.emit('update_attempt_status', { 
      attemptId: attempt.id, 
      status: 'pending_security_verification' 
    });
    
    // Show success message
    showSnackbar('Security verification requested', 'success');
    
    // Reset loading state after a delay
    setTimeout(() => {
      setLoginAttempts(prev => prev.map(a => 
        a.id === attempt.id ? { ...a, isLoading: false } : a
      ));
    }, 2000);
  };

  // Handle OTP submission
  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !selectedAttempt) return;

    try {
      // Update UI optimistically
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === selectedAttempt.id ? { ...attempt, isLoading: true } : attempt
        )
      );

      // Emit the OTP request to the server
      socket.emit('admin_action', { 
        attemptId: selectedAttempt.id, 
        action: 'request_otp',
        phoneNumber: phoneNumber.replace(/\D/g, '')
      });

      // Show success message
      showSnackbar('OTP request sent successfully', 'success');
      setOtpDialogOpen(false);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      showSnackbar('Failed to request OTP. Please try again.', 'error');
      
      // Revert optimistic update on error
      setLoginAttempts(prev => 
        prev.map(attempt => 
          attempt.id === selectedAttempt.id ? { ...attempt, isLoading: false } : attempt
        )
      );
    }
  };

  const renderStatusChip = (status: LoginStatus) => {
    switch (status) {
      case 'approved':
        return <Chip icon={<CheckCircleOutlineIcon />} label="Approved" color="success" size="small" variant="outlined" />;
      case 'denied':
        return <Chip icon={<HighlightOffIcon />} label="Denied" color="error" size="small" variant="outlined" />;
      case 'otp_required':
        return <Chip icon={<SmsFailedIcon />} label="OTP Required" color="warning" size="small" variant="outlined" />;
      case 'otp_verified':
        return <Chip icon={<CheckCircleOutlineIcon />} label="OTP Verified" color="success" size="small" variant="outlined" />;
      case 'reset_required':
        return <Chip icon={<VpnKeyOffIcon />} label="Reset Required" color="warning" size="small" variant="outlined" />;
      case 'pending_security_verification':
        return <Chip icon={<LockClock />} label="Security Check" color="secondary" size="small" variant="outlined" />;
      case 'security_verified':
        return <Chip icon={<VerifiedUserIcon />} label="Verified" color="success" size="small" variant="outlined" />;
      default:
        return <Chip icon={<HourglassEmptyIcon />} label="Pending" size="small" variant="outlined" />;
    }
  };

  const renderActionButtons = (attempt: LoginAttempt) => {
    if (attempt.isLoading) {
      return <CircularProgress size={24} />;
    }

    const isPending = attempt.status === 'pending' || attempt.status === 'pending_security_verification';
    const showOtpButton = isPending || attempt.status === 'otp_required';
    const showSecurityButton = isPending && attempt.status !== 'pending_security_verification';

    return (
      <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
        <Tooltip title="Approve">
          <IconButton 
            color="success" 
            onClick={() => handleAdminAction(attempt.id, 'approve')}
            disabled={!isPending}
            size="small"
          >
            <ApproveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deny">
          <IconButton 
            color="error" 
            onClick={() => handleAdminAction(attempt.id, 'deny')}
            disabled={!isPending}
            size="small"
          >
            <DenyIcon />
          </IconButton>
        </Tooltip>
        {showOtpButton && (
          <Tooltip title={attempt.status === 'otp_required' ? 'Resend OTP' : 'Request OTP'}>
            <IconButton 
              color={attempt.status === 'otp_required' ? 'secondary' : 'primary'}
              onClick={() => handleRequestOtp(attempt)}
              size="small"
            >
              {attempt.status === 'otp_required' ? <SmsFailedIcon /> : <OtpIcon />}
            </IconButton>
          </Tooltip>
        )}
        {showSecurityButton && (
          <Tooltip title="Request Security Verification">
            <IconButton 
              color="info"
              onClick={() => handleSecurityVerification(attempt)}
              size="small"
            >
              <SecurityIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Request Password Reset">
          <IconButton 
            color="warning" 
            onClick={() => handleAdminAction(attempt.id, 'request_reset')}
            disabled={!isPending}
            size="small"
          >
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Login Attempts
      </Typography>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Device</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loginAttempts.map((attempt) => (
                <TableRow 
                  key={attempt.id}
                  hover
                  onClick={() => setSelectedAttempt(attempt)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{attempt.username}</TableCell>
                  <TableCell>{attempt.device}</TableCell>
                  <TableCell>{attempt.ip}</TableCell>
                  <TableCell>{attempt.phoneNumber || '-'}</TableCell>
                  <TableCell>{new Date(attempt.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{renderStatusChip(attempt.status)}</TableCell>
                  <TableCell align="right">
                    {renderActionButtons(attempt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* OTP Dialog */}
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <form onSubmit={handleSubmitOtp}>
          <DialogTitle>Request OTP</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the phone number to send the OTP to:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              InputProps={{
                startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="e.g., 1234567890"
            />
            {otpCode && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Generated OTP Code:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                    {otpCode}
                  </Typography>
                  <Tooltip title="Copy to clipboard">
                    <IconButton 
                      size="small" 
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(otpCode);
                          showSnackbar('OTP copied to clipboard', 'success');
                        } catch (err) {
                          console.error('Failed to copy OTP:', err);
                        }
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              disabled={!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10}
            >
              {selectedAttempt?.status === 'otp_required' ? 'Resend OTP' : 'Send OTP'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity as AlertColor}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
