import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createServiceRequest, selectServiceRequestState } from '../features/serviceRequest/serviceRequestSlice';
import type { Attachment, ServiceRequestFormValues } from '../types/serviceRequest.types';
import RequestForm from '../components/serviceRequest/RequestForm';
import { useSnackbar } from '../utils/useSnackbar';

const EMPTY_VALUES: ServiceRequestFormValues = {
  customerName: '',
  email: '',
  phone: '',
  serviceType: '',
  title: '',
  description: '',
  priority: '',
  requestDate: '',
  address: '',
};

export default function AddServiceRequestPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useSnackbar();
  const { submitting } = useAppSelector(selectServiceRequestState);

  const handleSubmit = async (values: ServiceRequestFormValues, attachments: Attachment[]) => {
    try {
      const created = await dispatch(createServiceRequest({ values, attachments })).unwrap();
      notify(`Request ${created.id} created successfully.`, 'success');
      navigate('/requests');
    } catch (err) {
      notify(typeof err === 'string' ? err : 'Failed to create request.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconButton onClick={() => navigate('/requests')}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Add Service Request
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to create a new service request
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <RequestForm
            mode="create"
            initialValues={EMPTY_VALUES}
            initialAttachments={[]}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/requests')}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
