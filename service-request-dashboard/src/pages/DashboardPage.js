import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchDashboardStatistics, selectDashboard } from '../features/dashboard/dashboardSlice';
import StatCard from '../components/dashboard/StatCard';
import MonthlyRequestsChart from '../components/dashboard/MonthlyRequestsChart';
import StatusDistributionChart from '../components/dashboard/StatusDistributionChart';
import RecentRequestsTable from '../components/dashboard/RecentRequestsTable';
import RecentActivitiesList from '../components/dashboard/RecentActivitiesList';
import { StatCardsSkeleton, ChartSkeleton, TableSkeleton } from '../components/common/LoadingSkeletons';
import { useSnackbar } from '../utils/useSnackbar';
export default function DashboardPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const notify = useSnackbar();
    const { statistics, monthlyData, statusDistribution, recentRequests, recentActivities, loading, error } = useAppSelector(selectDashboard);
    const loadData = useCallback((isRefresh = false) => {
        dispatch(fetchDashboardStatistics())
            .unwrap()
            .then(() => {
            if (isRefresh)
                notify('Dashboard refreshed successfully.', 'success');
        })
            .catch(() => {
            notify('Failed to load dashboard information.', 'error');
        });
    }, [dispatch, notify]);
    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", fontWeight: 700, children: "Dashboard" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 0.5 }, children: "Overview of all customer service requests" })] }), _jsx(Tooltip, { title: "Refresh dashboard", children: _jsx("span", { children: _jsx(IconButton, { onClick: () => loadData(true), disabled: loading, color: "primary", sx: { border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2.5 }, children: _jsx(RefreshIcon, {}) }) }) })] }), error && _jsx(Alert, { severity: "error", children: error }), loading && !statistics ? (_jsx(StatCardsSkeleton, {})) : (_jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "Total Requests", count: statistics?.total ?? 0, icon: AssignmentOutlinedIcon, color: "primary" }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "New Requests", count: statistics?.new ?? 0, icon: FiberNewOutlinedIcon, color: "info" }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "In Progress", count: statistics?.inProgress ?? 0, icon: AutorenewOutlinedIcon, color: "warning" }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "Completed", count: statistics?.completed ?? 0, icon: CheckCircleOutlineIcon, color: "success" }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "Pending", count: statistics?.pending ?? 0, icon: HourglassEmptyOutlinedIcon, color: "secondary" }) }), _jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(StatCard, { title: "Cancelled", count: statistics?.cancelled ?? 0, icon: CancelOutlinedIcon, color: "error" }) })] })), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: { xs: 12, md: 7 }, children: _jsx(Card, { sx: { height: '100%' }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 700, gutterBottom: true, children: "Monthly Service Requests" }), loading && monthlyData.length === 0 ? _jsx(ChartSkeleton, {}) : _jsx(MonthlyRequestsChart, { data: monthlyData })] }) }) }), _jsx(Grid, { size: { xs: 12, md: 5 }, children: _jsx(Card, { sx: { height: '100%' }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 700, gutterBottom: true, children: "Request Status Distribution" }), loading && statusDistribution.length === 0 ? (_jsx(ChartSkeleton, {})) : (_jsx(StatusDistributionChart, { data: statusDistribution }))] }) }) })] }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }, children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 700, children: "Recent Service Requests" }), _jsx(Button, { size: "small", onClick: () => navigate('/requests'), children: "View All" })] }), loading && recentRequests.length === 0 ? _jsx(TableSkeleton, { rows: 5 }) : _jsx(RecentRequestsTable, { requests: recentRequests })] }) }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 700, gutterBottom: true, children: "Recent Activities" }), loading && recentActivities.length === 0 ? (_jsx(TableSkeleton, { rows: 5, columns: 1 })) : (_jsx(RecentActivitiesList, { activities: recentActivities }))] }) })] }));
}
