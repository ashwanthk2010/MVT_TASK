import type { Priority, RequestStatus, ServiceType } from './serviceRequest.types';

export interface DashboardStatistics {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  pending: number;
  cancelled: number;
}

export interface MonthlyDataPoint {
  month: string;
  requests: number;
}

export interface StatusDistributionPoint {
  status: RequestStatus;
  count: number;
}

export interface RecentActivity {
  id: string;
  type: 'created' | 'updated' | 'status_changed' | 'completed';
  message: string;
  timestamp: string;
  requestId: string;
}

export interface RecentRequestSummary {
  id: string;
  customerName: string;
  serviceType: ServiceType;
  requestDate: string;
  priority: Priority;
  status: RequestStatus;
}

export interface DashboardState {
  statistics: DashboardStatistics | null;
  monthlyData: MonthlyDataPoint[];
  statusDistribution: StatusDistributionPoint[];
  recentRequests: RecentRequestSummary[];
  recentActivities: RecentActivity[];
  loading: boolean;
  error: string | null;
}
