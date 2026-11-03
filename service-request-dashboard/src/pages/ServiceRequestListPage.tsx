import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteServiceRequest,
  fetchServiceRequests,
  selectServiceRequestState,
} from '../features/serviceRequest/serviceRequestSlice';
import type { ServiceRequest, ServiceRequestFilters } from '../types/serviceRequest.types';
import RequestFilters from '../components/serviceRequest/RequestFilters';
import RequestTable from '../components/serviceRequest/RequestTable';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { TableSkeleton } from '../components/common/LoadingSkeletons';
import { useSnackbar } from '../utils/useSnackbar';

const DEFAULT_FILTERS: ServiceRequestFilters = {
  search: '',
  status: 'All',
  priority: 'All',
  serviceType: 'All',
  dateFrom: null,
  dateTo: null,
};

export default function ServiceRequestListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useSnackbar();
  const { requests, loading, submitting, error, totalRecords } = useAppSelector(selectServiceRequestState);

  const [filters, setFilters] = useState<ServiceRequestFilters>(DEFAULT_FILTERS);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [requestToDelete, setRequestToDelete] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      dispatch(
        fetchServiceRequests({
          search: filters.search,
          status: filters.status,
          priority: filters.priority,
          serviceType: filters.serviceType,
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
          sortDirection,
          page: page + 1,
          pageSize,
        }),
      );
    }, 300);
    return () => clearTimeout(handle);
  }, [dispatch, filters, sortDirection, page, pageSize]);

  const handleFiltersChange = (next: ServiceRequestFilters) => {
    setFilters(next);
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  };

  const handleDeleteConfirm = async () => {
    if (!requestToDelete) return;
    try {
      await dispatch(deleteServiceRequest(requestToDelete.id)).unwrap();
      notify(`Request ${requestToDelete.id} deleted successfully.`, 'success');
      setRequestToDelete(null);
      if (requests.length === 1 && page > 0) {
        setPage(page - 1);
      }
    } catch (err) {
      notify(typeof err === 'string' ? err : 'Failed to delete request.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Service Requests
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Search, filter and manage all customer service requests
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/requests/new')}
          sx={{ borderRadius: 2.5, px: 2.5 }}
        >
          Add New Request
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mb: 1.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            Filters
          </Typography>
          <RequestFilters filters={filters} onChange={handleFiltersChange} onReset={handleResetFilters} />
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      <Card>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1 } }}>
          {loading ? (
            <TableSkeleton />
          ) : (
            <RequestTable
              requests={requests}
              sortDirection={sortDirection}
              onSortChange={(direction) => setSortDirection(direction)}
              onDelete={setRequestToDelete}
            />
          )}
          <TablePagination
            component="div"
            count={totalRecords}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={Boolean(requestToDelete)}
        title="Delete Service Request"
        description={`Are you sure you want to delete request ${requestToDelete?.id}? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={submitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setRequestToDelete(null)}
      />
    </Box>
  );
}
