import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '../components/common/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { loginUser } from '../features/auth/authSlice';
import { readRememberedEmail } from '../utils/authStorage';
import { isValidEmail } from '../utils/validators';
import { useSnackbar } from '../utils/useSnackbar';
import ForgotPasswordDialog from '../components/common/ForgotPasswordDialog';

const CURRENT_YEAR = new Date().getFullYear();

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useSnackbar();
  const submittingRef = useRef(false);

  const [email, setEmail] = useState(() => readRememberedEmail() ?? '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => Boolean(readRememberedEmail()));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!email.trim()) {
      next.email = 'Email address is required.';
    } else if (!isValidEmail(email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!password) {
      next.password = 'Password is required.';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setSubmitting(true);
    try {
      await dispatch(loginUser({ email, password, rememberMe })).unwrap();
      notify('Login successful. Welcome back!', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = typeof err === 'string' ? err : 'Invalid email or password.';
      setErrors((prev) => ({ ...prev, password: ' ' }));
      notify(message, 'error');
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: '100%', maxWidth: 420, p: { xs: 3, sm: 4.5 }, borderRadius: 3 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src="/megaviz-logo.png"
            alt="Megaviz"
            sx={{ width: '100%', maxWidth: 280, height: 'auto', mb: 1.5, objectFit: 'contain' }}
          />
          <Typography variant="h5" fontWeight={700}>
            ServiceDesk
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Smart Service Request Management
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to manage customer service requests.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            disabled={submitting}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            error={Boolean(errors.password)}
            helperText={errors.password?.trim() ? errors.password : ' '}
            disabled={submitting}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={submitting}
                />
              }
              label="Remember Me"
            />
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => setForgotOpen(true)}
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : undefined}
          >
            {submitting ? 'Signing in…' : 'Login'}
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 3 }}>
          © {CURRENT_YEAR} ServiceDesk. All rights reserved.
        </Typography>
      </Paper>

      <ForgotPasswordDialog open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </Box>
  );
}
