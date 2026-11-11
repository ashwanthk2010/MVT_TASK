const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
export function isRequired(value) {
    return value.trim().length > 0;
}
export function isValidEmail(value) {
    return EMAIL_REGEX.test(value.trim());
}
export function isValidIndianMobile(value) {
    return INDIAN_MOBILE_REGEX.test(value.trim());
}
export function isLengthInRange(value, min, max) {
    const length = value.trim().length;
    return length >= min && length <= max;
}
export function isMinLength(value, min) {
    return value.trim().length >= min;
}
export function isPastDate(dateString) {
    if (!dateString)
        return false;
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    return inputDate.getTime() < today.getTime();
}
export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export function validatePassword(password) {
    return password.length >= 6;
}
