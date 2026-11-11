import { useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { showSnackbar } from '../features/snackbar/snackbarSlice';
export function useSnackbar() {
    const dispatch = useAppDispatch();
    return useCallback((message, severity = 'info') => {
        dispatch(showSnackbar({ message, severity }));
    }, [dispatch]);
}
