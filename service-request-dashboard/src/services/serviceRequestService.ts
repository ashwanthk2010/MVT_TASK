import { generateMockServiceRequests } from '../mock/mockServiceRequests';
import type {
  Attachment,
  Priority,
  RequestStatus,
  ServiceRequest,
  ServiceRequestFormValues,
  ServiceType,
} from '../types/serviceRequest.types';
import { generateRequestId, initRequestSequence } from '../utils/idGenerator';
import { isEditable, isTransitionAllowed } from '../utils/statusTransitions';

const DB: ServiceRequest[] = generateMockServiceRequests();

const maxSeq = DB.reduce((max, r) => {
  const n = Number(r.id.replace('REQ-', ''));
  return Number.isFinite(n) ? Math.max(max, n) : max;
}, 0);
initRequestSequence(maxSeq);

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function cloneRequest(request: ServiceRequest): ServiceRequest {
  return JSON.parse(JSON.stringify(request));
}

export interface FetchRequestsParams {
  search?: string;
  status?: RequestStatus | 'All';
  priority?: Priority | 'All';
  serviceType?: ServiceType | 'All';
  dateFrom?: string | null;
  dateTo?: string | null;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface FetchRequestsResult {
  data: ServiceRequest[];
  total: number;
}

export async function fetchServiceRequests(params: FetchRequestsParams): Promise<FetchRequestsResult> {
  const {
    search = '',
    status = 'All',
    priority = 'All',
    serviceType = 'All',
    dateFrom = null,
    dateTo = null,
    sortDirection = 'desc',
    page = 1,
    pageSize = 10,
  } = params;

  let results = DB.slice();

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    results = results.filter(
      (r) => r.id.toLowerCase().includes(term) || r.customerName.toLowerCase().includes(term),
    );
  }
  if (status !== 'All') {
    results = results.filter((r) => r.status === status);
  }
  if (priority !== 'All') {
    results = results.filter((r) => r.priority === priority);
  }
  if (serviceType !== 'All') {
    results = results.filter((r) => r.serviceType === serviceType);
  }
  if (dateFrom) {
    const from = new Date(dateFrom).getTime();
    results = results.filter((r) => new Date(r.requestDate).getTime() >= from);
  }
  if (dateTo) {
    const to = new Date(dateTo).getTime();
    results = results.filter((r) => new Date(r.requestDate).getTime() <= to);
  }

  results.sort((a, b) => {
    const diff = new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
    return sortDirection === 'asc' ? diff : -diff;
  });

  const total = results.length;
  const start = (page - 1) * pageSize;
  const paginated = results.slice(start, start + pageSize).map(cloneRequest);

  return delay({ data: paginated, total });
}

export async function fetchServiceRequestById(id: string): Promise<ServiceRequest> {
  const found = DB.find((r) => r.id === id);
  if (!found) {
    return Promise.reject(new Error(`Service request ${id} was not found.`));
  }
  return delay(cloneRequest(found), 400);
}

export async function createServiceRequest(
  values: ServiceRequestFormValues,
  attachments: Attachment[] = [],
): Promise<ServiceRequest> {
  const now = new Date().toISOString();
  const newRequest: ServiceRequest = {
    id: generateRequestId(),
    customerName: values.customerName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    serviceType: values.serviceType as ServiceType,
    title: values.title.trim(),
    description: values.description.trim(),
    priority: values.priority as Priority,
    requestDate: values.requestDate,
    address: values.address.trim(),
    attachments,
    status: 'New',
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        id: `${now}-created`,
        type: 'created',
        description: 'Service request created',
        timestamp: now,
      },
    ],
  };
  DB.unshift(newRequest);
  return delay(cloneRequest(newRequest), 600);
}

export async function updateServiceRequest(
  id: string,
  values: ServiceRequestFormValues,
  attachments?: Attachment[],
): Promise<ServiceRequest> {
  const index = DB.findIndex((r) => r.id === id);
  if (index === -1) {
    return Promise.reject(new Error(`Service request ${id} was not found.`));
  }
  const existing = DB[index];
  if (!isEditable(existing.status)) {
    return Promise.reject(new Error(`Requests with status "${existing.status}" cannot be edited.`));
  }
  const now = new Date().toISOString();
  const updated: ServiceRequest = {
    ...existing,
    customerName: values.customerName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    serviceType: values.serviceType as ServiceType,
    title: values.title.trim(),
    description: values.description.trim(),
    priority: values.priority as Priority,
    address: values.address.trim(),
    attachments: attachments ?? existing.attachments,
    updatedAt: now,
    timeline: [
      ...existing.timeline,
      {
        id: `${now}-updated`,
        type: 'updated',
        description: 'Service request details updated',
        timestamp: now,
      },
    ],
  };
  DB[index] = updated;
  return delay(cloneRequest(updated), 600);
}

export async function deleteServiceRequest(id: string): Promise<string> {
  const index = DB.findIndex((r) => r.id === id);
  if (index === -1) {
    return Promise.reject(new Error(`Service request ${id} was not found.`));
  }
  DB.splice(index, 1);
  return delay(id, 500);
}

export async function updateRequestStatus(
  id: string,
  nextStatus: RequestStatus,
  reason?: string,
): Promise<ServiceRequest> {
  const index = DB.findIndex((r) => r.id === id);
  if (index === -1) {
    return Promise.reject(new Error(`Service request ${id} was not found.`));
  }
  const existing = DB[index];
  if (!isTransitionAllowed(existing.status, nextStatus)) {
    return Promise.reject(
      new Error(`Cannot change status from "${existing.status}" to "${nextStatus}".`),
    );
  }
  const now = new Date().toISOString();
  const updated: ServiceRequest = {
    ...existing,
    status: nextStatus,
    updatedAt: now,
    timeline: [
      ...existing.timeline,
      {
        id: `${now}-status`,
        type: nextStatus === 'Completed' ? 'completed' : 'status_changed',
        description: `Status changed from ${existing.status} to ${nextStatus}${reason ? ` — Reason: ${reason}` : ''}`,
        timestamp: now,
        fromStatus: existing.status,
        toStatus: nextStatus,
        reason,
      },
    ],
  };
  DB[index] = updated;
  return delay(cloneRequest(updated), 500);
}

export async function fetchAllRequestsSnapshot(): Promise<ServiceRequest[]> {
  return delay(DB.map(cloneRequest), 300);
}
