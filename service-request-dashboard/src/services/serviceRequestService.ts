import { generateMockServiceRequests } from '../mock/mockServiceRequests';
import type {
  Attachment,
  Priority,
  RequestStatus,
  SearchSuggestion,
  SearchSuggestionField,
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

export interface SearchSuggestionParams {
  query: string;
  status?: RequestStatus | 'All';
  priority?: Priority | 'All';
  serviceType?: ServiceType | 'All';
  dateFrom?: string | null;
  dateTo?: string | null;
}

const SEARCHABLE_FIELDS: Array<{ field: SearchSuggestionField; read: (request: ServiceRequest) => string }> = [
  { field: 'id', read: (request) => request.id },
  { field: 'customerName', read: (request) => request.customerName },
  { field: 'title', read: (request) => request.title },
];

function requestMatchesSearch(request: ServiceRequest, search: string): boolean {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return SEARCHABLE_FIELDS.some((source) => source.read(request).toLowerCase().includes(term));
}

function requestMatchesFilters(
  request: ServiceRequest,
  params: Pick<FetchRequestsParams, 'status' | 'priority' | 'serviceType' | 'dateFrom' | 'dateTo'>,
): boolean {
  const { status = 'All', priority = 'All', serviceType = 'All', dateFrom = null, dateTo = null } = params;
  if (status !== 'All' && request.status !== status) return false;
  if (priority !== 'All' && request.priority !== priority) return false;
  if (serviceType !== 'All' && request.serviceType !== serviceType) return false;
  if (dateFrom && new Date(request.requestDate).getTime() < new Date(dateFrom).getTime()) return false;
  if (dateTo && new Date(request.requestDate).getTime() > new Date(dateTo).getTime()) return false;
  return true;
}

export async function fetchSearchSuggestions(params: SearchSuggestionParams): Promise<SearchSuggestion[]> {
  const term = params.query.trim().toLowerCase();
  if (!term) return [];

  const seen = new Set<string>();
  const matches: SearchSuggestion[] = [];

  for (const request of DB) {
    if (!requestMatchesFilters(request, params)) continue;
    for (const source of SEARCHABLE_FIELDS) {
      const value = source.read(request).trim();
      if (!value.toLowerCase().includes(term)) continue;
      const dedupeKey = value.toLowerCase();
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      matches.push({
        key: `${source.field}:${dedupeKey}`,
        label: value,
        value,
        field: source.field,
      });
    }
  }

  const relevance = (label: string) => {
    const normalized = label.toLowerCase();
    if (normalized === term) return 0;
    if (normalized.startsWith(term)) return 1;
    return 2;
  };
  const fieldOrder: Record<SearchSuggestionField, number> = { id: 0, customerName: 1, title: 2 };

  matches.sort((a, b) => {
    const byRelevance = relevance(a.label) - relevance(b.label);
    if (byRelevance !== 0) return byRelevance;
    const byField = fieldOrder[a.field] - fieldOrder[b.field];
    if (byField !== 0) return byField;
    return a.label.localeCompare(b.label);
  });

  return matches.slice(0, 8);
}

export async function fetchServiceRequests(params: FetchRequestsParams): Promise<FetchRequestsResult> {
  const {
    search = '',
    sortDirection = 'desc',
    page = 1,
    pageSize = 10,
  } = params;

  const results = DB.filter((request) => requestMatchesFilters(request, params) && requestMatchesSearch(request, search));

  results.sort((a, b) => {
    const idNumber = (id: string) => {
      const n = Number(id.replace('REQ-', ''));
      return Number.isFinite(n) ? n : 0;
    };
    const diff = idNumber(a.id) - idNumber(b.id);
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
