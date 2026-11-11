import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import MailOutlineIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { loginUser } from '../features/auth/authSlice';
import { readRememberedEmail } from '../utils/authStorage';
import { isValidEmail } from '../utils/validators';
import { useSnackbar } from '../utils/useSnackbar';
import ForgotPasswordDialog from '../components/common/ForgotPasswordDialog';
const CURRENT_YEAR = new Date().getFullYear();
export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const notify = useSnackbar();
    const submittingRef = useRef(false);
    const [email, setEmail] = useState(() => readRememberedEmail() ?? '');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(() => Boolean(readRememberedEmail()));
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);
    const validate = () => {
        const next = {};
        if (!email.trim()) {
            next.email = 'Email address is required.';
        }
        else if (!isValidEmail(email)) {
            next.email = 'Please enter a valid email address.';
        }
        if (!password) {
            next.password = 'Password is required.';
        }
        else if (password.length < 6) {
            next.password = 'Password must be at least 6 characters.';
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submittingRef.current)
            return;
        if (!validate())
            return;
        submittingRef.current = true;
        setSubmitting(true);
        try {
            await dispatch(loginUser({ email, password, rememberMe })).unwrap();
            notify('Login successful. Welcome back!', 'success');
            navigate('/dashboard', { replace: true });
        }
        catch (err) {
            const message = typeof err === 'string' ? err : 'Invalid email or password.';
            setErrors((prev) => ({ ...prev, password: ' ' }));
            notify(message, 'error');
        }
        finally {
            submittingRef.current = false;
            setSubmitting(false);
        }
    };
    return (_jsxs(Box, { sx: {
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
            bgcolor: 'background.default',
        }, children: [_jsxs(Box, { sx: {
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    p: 6,
                    color: '#fff',
                    backgroundImage: 'linear-gradient(145deg, #312E81 0%, #4F46E5 48%, #0D9488 100%)',
                }, children: [_jsx(Box, { sx: {
                            position: 'absolute',
                            width: 420,
                            height: 420,
                            borderRadius: '50%',
                            top: -140,
                            right: -140,
                            bgcolor: 'rgba(255,255,255,0.08)',
                        } }), _jsx(Box, { sx: {
                            position: 'absolute',
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            bottom: -110,
                            left: -90,
                            bgcolor: 'rgba(14,165,233,0.25)',
                        } }), _jsxs(Box, { sx: { position: 'relative', display: 'flex', alignItems: 'center', gap: 1.25 }, children: [_jsx(Box, { sx: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(255,255,255,0.16)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                }, children: _jsx(HomeRepairServiceOutlinedIcon, { sx: { fontSize: 22 } }) }), _jsx(Typography, { variant: "h6", fontWeight: 700, sx: { color: '#fff' }, children: "ServiceDesk" })] }), _jsxs(Box, { sx: { position: 'relative', maxWidth: 460 }, children: [_jsx(Typography, { variant: "h3", sx: { fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#fff' }, children: "Manage every service request in one place." }), _jsx(Typography, { sx: { mt: 2, color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.6 }, children: "Track requests, update statuses and monitor activity from a single, streamlined admin portal." }), _jsx(Box, { sx: { mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }, children: ['Real-time dashboard statistics', 'Smart search, filters and sorting', 'Complete request lifecycle tracking'].map((feature) => (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.25 }, children: [_jsx(CheckCircleRoundedIcon, { sx: { fontSize: 20, color: '#5EEAD4' } }), _jsx(Typography, { variant: "body2", sx: { color: 'rgba(255,255,255,0.9)', fontWeight: 500 }, children: feature })] }, feature))) })] }), _jsxs(Typography, { variant: "caption", sx: { position: 'relative', color: 'rgba(255,255,255,0.6)' }, children: ["\u00A9 ", CURRENT_YEAR, " ServiceDesk. All rights reserved."] })] }), _jsx(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 4,
                    backgroundImage: {
                        xs: 'radial-gradient(circle at top, rgba(79,70,229,0.10), transparent 60%)',
                        md: 'none',
                    },
                }, children: _jsxs(Paper, { elevation: 0, sx: {
                        width: '100%',
                        maxWidth: 420,
                        p: { xs: 3, sm: 4.5 },
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
                    }, children: [_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }, children: [_jsx(Box, { component: "img", src: "/megaviz-logo.png", alt: "Megaviz", sx: { width: '100%', maxWidth: 200, height: 'auto', mb: 1.5, objectFit: 'contain' } }), _jsx(Typography, { variant: "h5", fontWeight: 700, children: "ServiceDesk" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 0.5 }, children: "Smart Service Request Management" })] }), _jsx(Typography, { variant: "h5", fontWeight: 700, sx: { mb: 0.5 }, children: "Welcome back" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: "Sign in to manage customer service requests." }), _jsxs(Box, { component: "form", noValidate: true, onSubmit: handleSubmit, sx: { display: 'flex', flexDirection: 'column', gap: 2.25 }, children: [_jsx(TextField, { label: "Email Address", type: "email", fullWidth: true, autoComplete: "email", value: email, onChange: (e) => {
                                        setEmail(e.target.value);
                                        if (errors.email)
                                            setErrors((prev) => ({ ...prev, email: undefined }));
                                    }, error: Boolean(errors.email), helperText: errors.email, disabled: submitting, slotProps: {
                                        input: {
                                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(MailOutlineIcon, { fontSize: "small", sx: { color: 'text.secondary' } }) })),
                                        },
                                    } }), _jsx(TextField, { label: "Password", type: showPassword ? 'text' : 'password', fullWidth: true, autoComplete: "current-password", value: password, onChange: (e) => {
                                        setPassword(e.target.value);
                                        if (errors.password)
                                            setErrors((prev) => ({ ...prev, password: undefined }));
                                    }, error: Boolean(errors.password), helperText: errors.password?.trim() ? errors.password : ' ', disabled: submitting, slotProps: {
                                        input: {
                                            startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(LockOutlinedIcon, { fontSize: "small", sx: { color: 'text.secondary' } }) })),
                                            endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: () => setShowPassword((s) => !s), edge: "end", tabIndex: -1, children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                        },
                                    } }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }, children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), disabled: submitting }), label: "Remember Me" }), _jsx(Link, { component: "button", type: "button", variant: "body2", onClick: () => setForgotOpen(true), underline: "hover", sx: { fontWeight: 600 }, children: "Forgot Password?" })] }), _jsx(Button, { type: "submit", variant: "contained", size: "large", fullWidth: true, disabled: submitting, startIcon: submitting ? _jsx(CircularProgress, { size: 18, color: "inherit" }) : undefined, sx: { py: 1.4, fontSize: '1rem', borderRadius: 2.5 }, children: submitting ? 'Signing in…' : 'Login' })] }), _jsxs(Typography, { variant: "caption", color: "text.secondary", align: "center", sx: { mt: 3, display: { xs: 'block', md: 'none' } }, children: ["\u00A9 ", CURRENT_YEAR, " ServiceDesk. All rights reserved."] })] }) }), _jsx(ForgotPasswordDialog, { open: forgotOpen, onClose: () => setForgotOpen(false) })] }));
}
