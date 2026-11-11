let requestSequence = 0;
export function initRequestSequence(startAt) {
    requestSequence = startAt;
}
export function generateRequestId() {
    requestSequence += 1;
    return `REQ-${String(requestSequence).padStart(4, '0')}`;
}
