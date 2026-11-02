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
  const { statistics, monthlyData, statusDistribution, recentRequests, recentActivities, loading, error } =
    useAppSelector(selectDashboard);

  const loadData = useCallback(
    (isRefresh = false) => {
      dispatch(fetchDashboardStatistics())
        .unwrap()
        .then(() => {
          if (isRefresh) notify('Dashboard refreshed successfully.', 'success');
        })
        .catch(() => {
          notify('Failed to load dashboard information.', 'error');
        });
    },
    [dispatch, notify],
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of all customer service requests
          </Typography>
        </Box>
        <Tooltip title="Refresh dashboard">
          <span>
            <IconButton onClick={() => loadData(true)} disabled={loading} color="primary">
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading && !statistics ? (
        <StatCardsSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="Total Requests" count={statistics?.total ?? 0} icon={AssignmentOutlinedIcon} color="primary" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="New Requests" count={statistics?.new ?? 0} icon={FiberNewOutlinedIcon} color="info" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="In Progress" count={statistics?.inProgress ?? 0} icon={AutorenewOutlinedIcon} color="warning" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="Completed" count={statistics?.completed ?? 0} icon={CheckCircleOutlineIcon} color="success" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="Pending" count={statistics?.pending ?? 0} icon={HourglassEmptyOutlinedIcon} color="secondary" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard title="Cancelled" count={statistics?.cancelled ?? 0} icon={CancelOutlinedIcon} color="error" />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Monthly Service Requests
              </Typography>
              {loading && monthlyData.length === 0 ? <ChartSkeleton /> : <MonthlyRequestsChart data={monthlyData} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Request Status Distribution
              </Typography>
              {loading && statusDistribution.length === 0 ? (
                <ChartSkeleton />
              ) : (
                <StatusDistributionChart data={statusDistribution} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Recent Service Requests
            </Typography>
            <Button size="small" onClick={() => navigate('/requests')}>
              View All
            </Button>
          </Box>
          {loading && recentRequests.length === 0 ? <TableSkeleton rows={5} /> : <RecentRequestsTable requests={recentRequests} />}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Recent Activities
          </Typography>
          {loading && recentActivities.length === 0 ? (
            <TableSkeleton rows={5} columns={1} />
          ) : (
            <RecentActivitiesList activities={recentActivities} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
