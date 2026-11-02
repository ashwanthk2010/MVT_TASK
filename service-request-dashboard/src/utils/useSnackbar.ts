import { useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { showSnackbar, type SnackbarSeverity } from '../features/snackbar/snackbarSlice';

export function useSnackbar() {
  const dispatch = useAppDispatch();

  return useCallback(
    (message: string, severity: SnackbarSeverity = 'info') => {
      dispatch(showSnackbar({ message, severity }));
    },
    [dispatch],
  );
}
