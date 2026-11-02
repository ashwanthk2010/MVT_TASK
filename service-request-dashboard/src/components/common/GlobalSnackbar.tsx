import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { hideSnackbar } from '../../features/snackbar/snackbarSlice';

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity, key } = useAppSelector((state) => state.snackbar);

  const handleClose = (_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      key={key}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
