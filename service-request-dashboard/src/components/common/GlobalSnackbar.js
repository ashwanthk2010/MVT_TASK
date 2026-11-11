import { jsx as _jsx } from "react/jsx-runtime";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideSnackbar } from '../../features/snackbar/snackbarSlice';
export default function GlobalSnackbar() {
    const dispatch = useAppDispatch();
    const { open, message, severity, key } = useAppSelector((state) => state.snackbar);
    const handleClose = (_event, reason) => {
        if (reason === 'clickaway')
            return;
        dispatch(hideSnackbar());
    };
    return (_jsx(Snackbar, { open: open, autoHideDuration: 4000, onClose: handleClose, anchorOrigin: { vertical: 'top', horizontal: 'right' }, children: _jsx(Alert, { onClose: handleClose, severity: severity, variant: "filled", sx: { width: '100%', borderRadius: 3, boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)', fontWeight: 500 }, children: message }) }, key));
}
