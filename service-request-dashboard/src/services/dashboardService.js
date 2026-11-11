import { fetchAllRequestsSnapshot } from './serviceRequestService';
import { monthKey } from '../utils/dateUtils';
function delay(value, ms = 500) {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
export async function fetchDashboardSnapshot() {
    const requests = await fetchAllRequestsSnapshot();
    const statistics = {
        total: requests.length,
        new: requests.filter((r) => r.status === 'New').length,
        inProgress: requests.filter((r) => r.status === 'In Progress').length,
        completed: requests.filter((r) => r.status === 'Completed').length,
        pending: requests.filter((r) => r.status === 'Pending').length,
        cancelled: requests.filter((r) => r.status === 'Cancelled').length,
    };
    const monthBuckets = new Map();
    const now = new Date();
    for (let i = 5; i >= 0; i -= 1) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        monthBuckets.set(key, 0);
    }
    requests.forEach((r) => {
        const key = monthKey(r.requestDate);
        if (monthBuckets.has(key)) {
            monthBuckets.set(key, (monthBuckets.get(key) ?? 0) + 1);
        }
    });
    const monthlyData = Array.from(monthBuckets.entries()).map(([month, count]) => ({
        month,
        requests: count,
    }));
    const statusCounts = new Map();
    requests.forEach((r) => statusCounts.set(r.status, (statusCounts.get(r.status) ?? 0) + 1));
    const statusDistribution = Array.from(statusCounts.entries())
        .map(([status, count]) => ({ status, count }))
        .sort((a, b) => b.count - a.count);
    const recentRequests = requests
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map((r) => ({
        id: r.id,
        customerName: r.customerName,
        serviceType: r.serviceType,
        requestDate: r.requestDate,
        priority: r.priority,
        status: r.status,
    }));
    const recentActivities = requests
        .flatMap((r) => r.timeline.map((event) => ({
        id: `${r.id}-${event.id}`,
        type: event.type,
        message: event.type === 'created'
            ? `New request ${r.id} created by ${r.customerName}`
            : event.type === 'completed'
                ? `Request ${r.id} marked as Completed`
                : event.type === 'status_changed'
                    ? `Request ${r.id} status changed to ${event.toStatus}`
                    : `Request ${r.id} details updated`,
        timestamp: event.timestamp,
        requestId: r.id,
    })))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);
    return delay({ statistics, monthlyData, statusDistribution, recentRequests, recentActivities });
}
