import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import type { Priority } from '../../types/serviceRequest.types';
import { PRIORITY_COLOR_MAP } from '../../theme/statusColors';

interface PriorityChipProps {
  priority: Priority;
  size?: 'small' | 'medium';
}

export default function PriorityChip({ priority, size = 'small' }: PriorityChipProps) {
  const theme = useTheme();
  const colorKey = PRIORITY_COLOR_MAP[priority];
  const main = colorKey === 'default' ? theme.palette.grey[500] : theme.palette[colorKey].main;
  const text = colorKey === 'default' ? theme.palette.grey[700] : theme.palette[colorKey].dark;

  return (
    <Chip
      label={priority}
      size={size}
      variant="outlined"
      icon={<FlagRoundedIcon sx={{ fontSize: '14px !important', color: `${main} !important` }} />}
      sx={{
        color: text,
        borderColor: alpha(main, 0.35),
        bgcolor: '#fff',
        maxWidth: '100%',
      }}
    />
  );
}
