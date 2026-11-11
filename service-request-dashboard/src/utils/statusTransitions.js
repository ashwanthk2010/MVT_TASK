export const ALL_STATUSES = [
    'New',
    'Under Review',
    'Approved',
    'In Progress',
    'Pending',
    'Completed',
    'Cancelled',
    'Rejected',
];
export const TERMINAL_STATUSES = ['Completed', 'Cancelled', 'Rejected'];
export const STATUS_TRANSITIONS = {
    New: ['Under Review'],
    'Under Review': ['Approved', 'Rejected'],
    Approved: ['In Progress'],
    'In Progress': ['Pending', 'Completed'],
    Pending: ['In Progress', 'Cancelled'],
    Completed: [],
    Cancelled: [],
    Rejected: [],
};
export const STATUSES_REQUIRING_REASON = ['Cancelled', 'Rejected'];
export function getAllowedNextStatuses(current) {
    return STATUS_TRANSITIONS[current] ?? [];
}
export function isTransitionAllowed(from, to) {
    return getAllowedNextStatuses(from).includes(to);
}
export function isTerminalStatus(status) {
    return TERMINAL_STATUSES.includes(status);
}
export function isEditable(status) {
    return status !== 'Completed' && status !== 'Cancelled';
}
export function reasonRequired(status) {
    return STATUSES_REQUIRING_REASON.includes(status);
}
