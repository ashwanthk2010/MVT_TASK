import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
export default function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', confirmColor = 'primary', loading = false, onConfirm, onCancel, children, }) {
    return (_jsxs(Dialog, { open: open, onClose: onCancel, fullWidth: true, maxWidth: "xs", children: [_jsx(DialogTitle, { children: title }), _jsxs(DialogContent, { children: [_jsx(DialogContentText, { children: description }), children] }), _jsxs(DialogActions, { sx: { px: 3, pb: 2.5, pt: 1, gap: 1 }, children: [_jsx(Button, { onClick: onCancel, disabled: loading, variant: "outlined", color: "inherit", sx: { color: 'text.primary' }, children: cancelLabel }), _jsx(Button, { onClick: onConfirm, variant: "contained", color: confirmColor, disabled: loading, startIcon: loading ? _jsx(CircularProgress, { size: 16, color: "inherit" }) : undefined, children: confirmLabel })] })] }));
}
