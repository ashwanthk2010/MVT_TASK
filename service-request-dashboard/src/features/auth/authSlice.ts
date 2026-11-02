import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordRequest, loginRequest } from '../../services/authService';
import type { AuthState, LoginCredentials } from '../../types/auth.types';
import {
  clearRememberedEmail,
  clearSession,
  readRememberedEmail,
  readSession,
  saveRememberedEmail,
  saveSession,
} from '../../utils/authStorage';
import type { RootState } from '../../app/store';

const existingSession = readSession();
const rememberedEmail = readRememberedEmail();

const initialState: AuthState = {
  user: existingSession,
  isAuthenticated: Boolean(existingSession),
  loading: false,
  error: null,
  rememberMe: Boolean(rememberedEmail),
  rememberedEmail,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const user = await loginRequest(credentials);
      if (credentials.rememberMe) {
        saveRememberedEmail(credentials.email.trim());
      } else {
        clearRememberedEmail();
      }
      saveSession(user);
      return { user, rememberMe: credentials.rememberMe };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed.');
    }
  },
);

export const submitForgotPassword = createAsyncThunk(
  'auth/submitForgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      return await forgotPasswordRequest(email);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Request failed.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      clearSession();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: AuthState['user']; rememberMe: boolean }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.rememberMe = action.payload.rememberMe;
        state.rememberedEmail = action.payload.rememberMe ? action.payload.user?.email ?? null : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = (action.payload as string) ?? 'Invalid email or password.';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
