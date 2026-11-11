const SESSION_KEY = 'ssrmd.session';
const REMEMBER_EMAIL_KEY = 'ssrmd.rememberedEmail';
export function saveSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
}
export function readSession() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw)
        return null;
    try {
        const parsed = JSON.parse(raw);
        return parsed.user ?? null;
    }
    catch {
        return null;
    }
}
export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}
export function saveRememberedEmail(email) {
    localStorage.setItem(REMEMBER_EMAIL_KEY, email);
}
export function readRememberedEmail() {
    return localStorage.getItem(REMEMBER_EMAIL_KEY);
}
export function clearRememberedEmail() {
    localStorage.removeItem(REMEMBER_EMAIL_KEY);
}
