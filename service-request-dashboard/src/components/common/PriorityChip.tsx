import Chip from '@mui/material/Chip';
import type { Priority } from '../../types/serviceRequest.types';
import { PRIORITY_COLOR_MAP } from '../../theme/statusColors';

interface PriorityChipProps {
  priority: Priority;
  size?: 'small' | 'medium';
}

export default function PriorityChip({ priority, size = 'small' }: PriorityChipProps) {
  return <Chip label={priority} color={PRIORITY_COLOR_MAP[priority]} size={size} variant="outlined" />;
}
