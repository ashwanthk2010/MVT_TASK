import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '../common/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Attachment, ServiceRequestFormValues } from '../../types/serviceRequest.types';
import AttachmentUpload from './AttachmentUpload';
import ConfirmDialog from '../common/ConfirmDialog';
import { isLengthInRange, isMinLength, isPastDate, isRequired, isValidEmail, isValidIndianMobile } from '../../utils/validators';
import { toISODateOnly } from '../../utils/dateUtils';

const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Other'] as const;
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;

export type FormErrors = Partial<Record<keyof ServiceRequestFormValues, string>>;

interface RequestFormProps {
  mode: 'create' | 'edit';
  initialValues: ServiceRequestFormValues;
  initialAttachments: Attachment[];
  submitting: boolean;
  onSubmit: (values: ServiceRequestFormValues, attachments: Attachment[]) => void;
  onCancel: () => void;
}

function validateField(
  field: keyof ServiceRequestFormValues,
  values: ServiceRequestFormValues,
  mode: 'create' | 'edit',
): string | undefined {
  switch (field) {
    case 'customerName':
      if (!isRequired(values.customerName)) return 'Customer name is required.';
      if (!isLengthInRange(values.customerName, 3, 50)) return 'Must be between 3 and 50 characters.';
      return undefined;
    case 'email':
      if (!isRequired(values.email)) return 'Email address is required.';
      if (!isValidEmail(values.email)) return 'Please enter a valid email address.';
      return undefined;
    case 'phone':
      if (!isRequired(values.phone)) return 'Phone number is required.';
      if (!isValidIndianMobile(values.phone)) return 'Enter a valid 10-digit Indian mobile number.';
      return undefined;
    case 'serviceType':
      if (!values.serviceType) return 'Please select a service type.';
      return undefined;
    case 'title':
      if (!isRequired(values.title)) return 'Request title is required.';
      if (!isLengthInRange(values.title, 5, 100)) return 'Must be between 5 and 100 characters.';
      return undefined;
    case 'description':
      if (!isRequired(values.description)) return 'Description is required.';
      if (!isMinLength(values.description, 20)) return 'Must be at least 20 characters.';
      return undefined;
    case 'priority':
      if (!values.priority) return 'Please select a priority.';
      return undefined;
    case 'requestDate':
      if (!values.requestDate) return 'Request date is required.';
      if (mode === 'create' && isPastDate(values.requestDate)) return 'Request date cannot be in the past.';
      return undefined;
    case 'address':
      if (!isRequired(values.address)) return 'Address is required.';
      if (!isMinLength(values.address, 10)) return 'Must be at least 10 characters.';
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(values: ServiceRequestFormValues, mode: 'create' | 'edit'): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as (keyof ServiceRequestFormValues)[]).forEach((field) => {
    const message = validateField(field, values, mode);
    if (message) errors[field] = message;
  });
  return errors;
}

function trimValues(values: ServiceRequestFormValues): ServiceRequestFormValues {
  return {
    ...values,
    customerName: values.customerName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    title: values.title.trim(),
    description: values.description.trim(),
    address: values.address.trim(),
  };
}

export default function RequestForm({
  mode,
  initialValues,
  initialAttachments,
  submitting,
  onSubmit,
  onCancel,
}: RequestFormProps) {
  const [values, setValues] = useState<ServiceRequestFormValues>(initialValues);
  const [attachments, setAttachments] = useState<Attachment[]>(initialAttachments);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ServiceRequestFormValues, boolean>>>({});
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const submittingRef = useRef(false);

  const isDirty =
    JSON.stringify(values) !== JSON.stringify(initialValues) ||
    JSON.stringify(attachments) !== JSON.stringify(initialAttachments);

  const handleChange = (field: keyof ServiceRequestFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ServiceRequestFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const message = validateField(field, values, mode);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || submitting) return;

    const trimmed = trimValues(values);
    const allErrors = validateAll(trimmed, mode);
    setErrors(allErrors);
    setTouched({
      customerName: true,
      email: true,
      phone: true,
      serviceType: true,
      title: true,
      description: true,
      priority: true,
      requestDate: true,
      address: true,
    });

    if (Object.keys(allErrors).length > 0) return;

    submittingRef.current = true;
    onSubmit(trimmed, attachments);
    submittingRef.current = false;
  };

  const handleCancelClick = () => {
    if (isDirty) {
      setCancelDialogOpen(true);
    } else {
      onCancel();
    }
  };

  const handleResetConfirm = () => {
    setValues(initialValues);
    setAttachments(initialAttachments);
    setErrors({});
    setTouched({});
    setResetDialogOpen(false);
  };

  const errorFor = (field: keyof ServiceRequestFormValues) => (touched[field] ? errors[field] : undefined);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Customer Name"
            fullWidth
            required
            value={values.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            onBlur={() => handleBlur('customerName')}
            error={Boolean(errorFor('customerName'))}
            helperText={errorFor('customerName')}
            disabled={submitting}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={Boolean(errorFor('email'))}
            helperText={errorFor('email')}
            disabled={submitting}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Phone Number"
            fullWidth
            required
            placeholder="9876543210"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
            onBlur={() => handleBlur('phone')}
            error={Boolean(errorFor('phone'))}
            helperText={errorFor('phone')}
            disabled={submitting}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="Service Type"
            fullWidth
            required
            value={values.serviceType}
            onChange={(e) => handleChange('serviceType', e.target.value)}
            onBlur={() => handleBlur('serviceType')}
            error={Boolean(errorFor('serviceType'))}
            helperText={errorFor('serviceType')}
            disabled={submitting}
          >
            {SERVICE_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={12}>
          <TextField
            label="Request Title"
            fullWidth
            required
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            error={Boolean(errorFor('title'))}
            helperText={errorFor('title')}
            disabled={submitting}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            minRows={3}
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            error={Boolean(errorFor('description'))}
            helperText={errorFor('description') ?? `${values.description.trim().length}/20 characters minimum`}
            disabled={submitting}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label="Priority"
            fullWidth
            required
            value={values.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            onBlur={() => handleBlur('priority')}
            error={Boolean(errorFor('priority'))}
            helperText={errorFor('priority')}
            disabled={submitting}
          >
            {PRIORITIES.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DatePicker
            label="Request Date"
            value={values.requestDate ? new Date(values.requestDate) : null}
            onChange={(date) => {
              handleChange('requestDate', date ? toISODateOnly(date) : '');
            }}
            disabled={submitting}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                onBlur: () => handleBlur('requestDate'),
                error: Boolean(errorFor('requestDate')),
                helperText: errorFor('requestDate'),
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Address"
            fullWidth
            required
            multiline
            minRows={2}
            value={values.address}
            onChange={(e) => handleChange('address', e.target.value)}
            onBlur={() => handleBlur('address')}
            error={Boolean(errorFor('address'))}
            helperText={errorFor('address')}
            disabled={submitting}
          />
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle2" gutterBottom>
            Attachments
          </Typography>
          <AttachmentUpload attachments={attachments} onChange={setAttachments} disabled={submitting} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexWrap: 'wrap' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : undefined}
          fullWidth={false}
          sx={{ minWidth: 140 }}
        >
          {mode === 'create' ? 'Submit Request' : 'Save Changes'}
        </Button>
        <Button variant="outlined" color="inherit" disabled={submitting} onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button
          variant="text"
          color="inherit"
          disabled={submitting || !isDirty}
          onClick={() => setResetDialogOpen(true)}
        >
          Reset
        </Button>
      </Box>

      <ConfirmDialog
        open={cancelDialogOpen}
        title="Discard unsaved changes?"
        description="You have unsaved changes. Are you sure you want to leave this form?"
        confirmLabel="Discard"
        confirmColor="warning"
        onConfirm={() => {
          setCancelDialogOpen(false);
          onCancel();
        }}
        onCancel={() => setCancelDialogOpen(false)}
      />

      <ConfirmDialog
        open={resetDialogOpen}
        title="Reset form?"
        description="All entered values and attachments will be cleared."
        confirmLabel="Reset"
        confirmColor="warning"
        onConfirm={handleResetConfirm}
        onCancel={() => setResetDialogOpen(false)}
      />
    </Box>
  );
}
