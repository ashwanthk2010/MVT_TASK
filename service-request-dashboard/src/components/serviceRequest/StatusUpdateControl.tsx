import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '../common/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { RequestStatus } from '../../types/serviceRequest.types';
import { getAllowedNextStatuses, reasonRequired } from '../../utils/statusTransitions';
import ConfirmDialog from '../common/ConfirmDialog';
import { useAppDispatch } from '../../app/hooks';
import { updateRequestStatus } from '../../features/serviceRequest/serviceRequestSlice';
import { useSnackbar } from '../../utils/useSnackbar';

interface StatusUpdateControlProps {
  requestId: string;
  currentStatus: RequestStatus;
}

export default function StatusUpdateControl({ requestId, currentStatus }: StatusUpdateControlProps) {
  const dispatch = useAppDispatch();
  const notify = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [pendingStatus, setPendingStatus] = useState<RequestStatus | null>(null);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nextStatuses = getAllowedNextStatuses(currentStatus);

  if (nextStatuses.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No further status changes are possible for this request.
      </Typography>
    );
  }

  const handleSelect = (status: RequestStatus) => {
    setAnchorEl(null);
    setPendingStatus(status);
    setReason('');
    setReasonError(null);
  };

  const handleConfirm = async () => {
    if (!pendingStatus) return;
    const requiresReason = reasonRequired(pendingStatus);
    if (requiresReason && !reason.trim()) {
      setReasonError('A reason is required for this status change.');
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(
        updateRequestStatus({ id: requestId, status: pendingStatus, reason: requiresReason ? reason.trim() : undefined }),
      ).unwrap();
      notify(`Status updated to "${pendingStatus}" successfully.`, 'success');
      setPendingStatus(null);
    } catch (err) {
      notify(typeof err === 'string' ? err : 'Failed to update status.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Update Status
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {nextStatuses.map((status) => (
          <MenuItem key={status} onClick={() => handleSelect(status)}>
            Mark as {status}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={Boolean(pendingStatus)}
        title={`Change status to "${pendingStatus}"?`}
        description={`Are you sure you want to change the status of ${requestId} from "${currentStatus}" to "${pendingStatus}"?`}
        confirmLabel="Update Status"
        loading={submitting}
        onConfirm={handleConfirm}
        onCancel={() => setPendingStatus(null)}
      >
        {pendingStatus && reasonRequired(pendingStatus) && (
          <TextField
            label="Reason"
            fullWidth
            required
            multiline
            minRows={2}
            sx={{ mt: 2 }}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (reasonError) setReasonError(null);
            }}
            error={Boolean(reasonError)}
            helperText={reasonError}
          />
        )}
      </ConfirmDialog>
    </Box>
  );
}
