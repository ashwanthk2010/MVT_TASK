import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '../../app/hooks';
import { submitForgotPassword } from '../../features/auth/authSlice';
import { isValidEmail } from '../../utils/validators';

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordDialog({ open, onClose }: ForgotPasswordDialogProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleClose = () => {
    setEmail('');
    setError(null);
    setResult(null);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const message = await dispatch(submitForgotPassword(email)).unwrap();
      setResult({ type: 'success', message });
    } catch (err) {
      setResult({ type: 'error', message: typeof err === 'string' ? err : 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Enter your registered email address and we will send you password reset instructions.
        </DialogContentText>
        {result && (
          <Alert severity={result.type} sx={{ mb: 2 }}>
            {result.message}
          </Alert>
        )}
        {!result && (
          <TextField
            autoFocus
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            error={Boolean(error)}
            helperText={error}
            disabled={loading}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>{result ? 'Close' : 'Cancel'}</Button>
        {!result && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          >
            Send Instructions
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
