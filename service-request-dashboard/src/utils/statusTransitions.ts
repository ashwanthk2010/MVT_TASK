import type { RequestStatus } from '../types/serviceRequest.types';

export const ALL_STATUSES: RequestStatus[] = [
  'New',
  'Under Review',
  'Approved',
  'In Progress',
  'Pending',
  'Completed',
  'Cancelled',
  'Rejected',
];

export const TERMINAL_STATUSES: RequestStatus[] = ['Completed', 'Cancelled', 'Rejected'];

export const STATUS_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  New: ['Under Review'],
  'Under Review': ['Approved', 'Rejected'],
  Approved: ['In Progress'],
  'In Progress': ['Pending', 'Completed'],
  Pending: ['In Progress', 'Cancelled'],
  Completed: [],
  Cancelled: [],
  Rejected: [],
};

export const STATUSES_REQUIRING_REASON: RequestStatus[] = ['Cancelled', 'Rejected'];

export function getAllowedNextStatuses(current: RequestStatus): RequestStatus[] {
  return STATUS_TRANSITIONS[current] ?? [];
}

export function isTransitionAllowed(from: RequestStatus, to: RequestStatus): boolean {
  return getAllowedNextStatuses(from).includes(to);
}

export function isTerminalStatus(status: RequestStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

export function isEditable(status: RequestStatus): boolean {
  return status !== 'Completed' && status !== 'Cancelled';
}

export function reasonRequired(status: RequestStatus): boolean {
  return STATUSES_REQUIRING_REASON.includes(status);
}
