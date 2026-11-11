import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export default function ForgotPasswordDialog({ open, onClose }) {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
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
        }
        catch (err) {
            setResult({ type: 'error', message: typeof err === 'string' ? err : 'Something went wrong.' });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onClose: handleClose, fullWidth: true, maxWidth: "xs", children: [_jsx(DialogTitle, { children: "Forgot Password" }), _jsxs(DialogContent, { children: [_jsx(DialogContentText, { sx: { mb: 2 }, children: "Enter your registered email address and we will send you password reset instructions." }), result && (_jsx(Alert, { severity: result.type, sx: { mb: 2 }, children: result.message })), !result && (_jsx(TextField, { autoFocus: true, fullWidth: true, label: "Email Address", type: "email", value: email, onChange: (e) => {
                            setEmail(e.target.value);
                            if (error)
                                setError(null);
                        }, error: Boolean(error), helperText: error, disabled: loading }))] }), _jsxs(DialogActions, { sx: { px: 3, pb: 2.5, pt: 1, gap: 1 }, children: [_jsx(Button, { onClick: handleClose, variant: "outlined", color: "inherit", sx: { color: 'text.primary' }, children: result ? 'Close' : 'Cancel' }), !result && (_jsx(Button, { onClick: handleSubmit, variant: "contained", disabled: loading, startIcon: loading ? _jsx(CircularProgress, { size: 16, color: "inherit" }) : undefined, children: "Send Instructions" }))] })] }));
}
