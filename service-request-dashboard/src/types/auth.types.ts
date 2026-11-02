export interface User {
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  rememberMe: boolean;
  rememberedEmail: string | null;
}
