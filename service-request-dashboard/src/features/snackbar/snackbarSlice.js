import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    open: false,
    message: '',
    severity: 'info',
    key: 0,
};
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.key += 1;
        },
        hideSnackbar: (state) => {
            state.open = false;
        },
    },
});
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
