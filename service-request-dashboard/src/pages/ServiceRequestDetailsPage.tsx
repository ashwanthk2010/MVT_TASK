import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HistoryIcon from '@mui/icons-material/History';
import { alpha } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteServiceRequest,
  fetchServiceRequestById,
  selectServiceRequestState,
} from '../features/serviceRequest/serviceRequestSlice';
import StatusChip from '../components/common/StatusChip';
import PriorityChip from '../components/common/PriorityChip';
import StatusUpdateControl from '../components/serviceRequest/StatusUpdateControl';
import RequestTimeline from '../components/serviceRequest/RequestTimeline';
import AttachmentGallery from '../components/serviceRequest/AttachmentGallery';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { DetailsSkeleton } from '../components/common/LoadingSkeletons';
import { useSnackbar } from '../utils/useSnackbar';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { isEditable } from '../utils/statusTransitions';

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 0.25, sm: 2 },
        py: 1.25,
        borderBottom: '1px dashed',
        borderColor: 'divider',
        '&:last-of-type': { borderBottom: 0 },
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ width: { sm: 160 }, flexShrink: 0, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word', color: 'text.primary' }}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionTitle({ icon, title, color = 'primary' }: { icon: React.ReactNode; title: string; color?: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={(t) => {
          const main = (t.palette as unknown as Record<string, { main: string }>)[color]?.main ?? t.palette.primary.main;
          return {
            width: 32,
            height: 32,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(main, 0.12),
            color: main,
          };
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>
    </Box>
  );
}

export default function ServiceRequestDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useSnackbar();
  const { selectedRequest, loading, submitting, error } = useAppSelector(selectServiceRequestState);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchServiceRequestById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await dispatch(deleteServiceRequest(id)).unwrap();
      notify(`Request ${id} deleted successfully.`, 'success');
      navigate('/requests');
    } catch (err) {
      notify(typeof err === 'string' ? err : 'Failed to delete request.', 'error');
    }
  };

  if (loading || !selectedRequest) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <DetailsSkeleton />
      </Box>
    );
  }

  const request = selectedRequest;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            onClick={() => navigate('/requests')}
            sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2.5 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h4" fontWeight={700}>
                {request.id}
              </Typography>
              <StatusChip status={request.status} size="medium" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              Created on {formatDate(request.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            disabled={!isEditable(request.status)}
            onClick={() => navigate(`/requests/${request.id}/edit`)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
        </Box>
      </Box>

      {!isEditable(request.status) && (
        <Alert severity="info">
          This request has status "{request.status}" and can no longer be edited.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1, flexWrap: 'wrap' }}
                >
                  <SectionTitle icon={<DescriptionOutlinedIcon fontSize="small" />} title="Request Information" />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <PriorityChip priority={request.priority} />
                    <StatusChip status={request.status} />
                  </Box>
                </Box>
                <Divider sx={{ mb: 0.5 }} />
                <InfoRow label="Request Title" value={request.title} />
                <InfoRow label="Service Category" value={request.serviceType} />
                <InfoRow label="Description" value={request.description} />
                <InfoRow label="Created Date" value={formatDate(request.createdAt)} />
                <InfoRow label="Last Updated" value={formatDateTime(request.updatedAt)} />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <SectionTitle icon={<PersonOutlineIcon fontSize="small" />} title="Customer Information" color="secondary" />
                <Divider sx={{ mt: 1.5, mb: 0.5 }} />
                <InfoRow label="Name" value={request.customerName} />
                <InfoRow label="Email" value={request.email} />
                <InfoRow label="Phone" value={request.phone} />
                <InfoRow label="Address" value={request.address} />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <SectionTitle icon={<AttachFileIcon fontSize="small" />} title="Attachments" color="info" />
                <Divider sx={{ mt: 1.5, mb: 2 }} />
                <AttachmentGallery attachments={request.attachments} />
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Card>
              <CardContent>
                <SectionTitle icon={<SyncAltIcon fontSize="small" />} title="Status Management" color="warning" />
                <Divider sx={{ mt: 1.5, mb: 2 }} />
                <StatusUpdateControl requestId={request.id} currentStatus={request.status} />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <SectionTitle icon={<HistoryIcon fontSize="small" />} title="Request Timeline" color="success" />
                <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                <RequestTimeline events={request.timeline} />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Service Request"
        description={`Are you sure you want to delete request ${request.id}? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmColor="error"
        loading={submitting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </Box>
  );
}
