export type ServiceType = 'Installation' | 'Repair' | 'Maintenance' | 'Inspection' | 'Other';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export type RequestStatus =
  | 'New'
  | 'Under Review'
  | 'Approved'
  | 'In Progress'
  | 'Pending'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export type TimelineEventType = 'created' | 'updated' | 'status_changed' | 'completed';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  description: string;
  timestamp: string;
  fromStatus?: RequestStatus;
  toStatus?: RequestStatus;
  reason?: string;
}

export interface ServiceRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  title: string;
  description: string;
  priority: Priority;
  requestDate: string;
  address: string;
  attachments: Attachment[];
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface ServiceRequestFormValues {
  customerName: string;
  email: string;
  phone: string;
  serviceType: ServiceType | '';
  title: string;
  description: string;
  priority: Priority | '';
  requestDate: string;
  address: string;
}

export interface ServiceRequestFilters {
  search: string;
  status: RequestStatus | 'All';
  priority: Priority | 'All';
  serviceType: ServiceType | 'All';
  dateFrom: string | null;
  dateTo: string | null;
}

export interface ServiceRequestState {
  requests: ServiceRequest[];
  selectedRequest: ServiceRequest | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  totalRecords: number;
}
