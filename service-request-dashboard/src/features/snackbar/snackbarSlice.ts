import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  key: number;
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
  key: 0,
};

interface ShowSnackbarPayload {
  message: string;
  severity: SnackbarSeverity;
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
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
