import type { User } from '../types/auth.types';

const SESSION_KEY = 'ssrmd.session';
const REMEMBER_EMAIL_KEY = 'ssrmd.rememberedEmail';

interface StoredSession {
  user: User;
}

export function saveSession(user: User): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user } satisfies StoredSession));
}

export function readSession(): User | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredSession;
    return parsed.user ?? null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function saveRememberedEmail(email: string): void {
  localStorage.setItem(REMEMBER_EMAIL_KEY, email);
}

export function readRememberedEmail(): string | null {
  return localStorage.getItem(REMEMBER_EMAIL_KEY);
}

export function clearRememberedEmail(): void {
  localStorage.removeItem(REMEMBER_EMAIL_KEY);
}
