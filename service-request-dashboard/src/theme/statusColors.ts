import type { Priority, RequestStatus } from '../types/serviceRequest.types';

export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export const STATUS_COLOR_MAP: Record<RequestStatus, ChipColor> = {
  New: 'info',
  'Under Review': 'secondary',
  Approved: 'primary',
  'In Progress': 'warning',
  Pending: 'warning',
  Completed: 'success',
  Cancelled: 'default',
  Rejected: 'error',
};

export const PRIORITY_COLOR_MAP: Record<Priority, ChipColor> = {
  Low: 'success',
  Medium: 'info',
  High: 'warning',
  Critical: 'error',
};

export const CHART_COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#d97706', '#dc2626', '#0891b2', '#64748b', '#be185d'];
