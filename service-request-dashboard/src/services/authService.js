const DEMO_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'Admin@123';
function delay(value, ms = 700) {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
export async function loginRequest(credentials) {
    const { email, password } = credentials;
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        return delay({ email: DEMO_EMAIL, name: 'Admin User' });
    }
    return Promise.reject(new Error('Invalid email or password.'));
}
export async function forgotPasswordRequest(email) {
    if (email.trim().toLowerCase() === DEMO_EMAIL) {
        return delay('Password reset instructions have been sent to your email.', 800);
    }
    return Promise.reject(new Error('No account found with this email address.'));
}
