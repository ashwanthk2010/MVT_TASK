import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import serviceRequestReducer from '../features/serviceRequest/serviceRequestSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import snackbarReducer from '../features/snackbar/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceRequest: serviceRequestReducer,
    dashboard: dashboardReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
