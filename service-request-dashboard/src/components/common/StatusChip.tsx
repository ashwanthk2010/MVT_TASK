import Chip from '@mui/material/Chip';
import type { RequestStatus } from '../../types/serviceRequest.types';
import { STATUS_COLOR_MAP } from '../../theme/statusColors';

interface StatusChipProps {
  status: RequestStatus;
  size?: 'small' | 'medium';
}

export default function StatusChip({ status, size = 'small' }: StatusChipProps) {
  return <Chip label={status} color={STATUS_COLOR_MAP[status]} size={size} variant="filled" />;
}
