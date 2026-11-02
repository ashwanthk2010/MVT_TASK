import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '../common/Typography';
import type { TimelineEvent } from '../../types/serviceRequest.types';
import { formatDateTime } from '../../utils/dateUtils';

const DOT_COLOR: Record<TimelineEvent['type'], 'info' | 'warning' | 'secondary' | 'success'> = {
  created: 'info',
  updated: 'warning',
  status_changed: 'secondary',
  completed: 'success',
};

interface RequestTimelineProps {
  events: TimelineEvent[];
}

export default function RequestTimeline({ events }: RequestTimelineProps) {
  const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <Timeline sx={{ p: 0, m: 0, '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 } }}>
      {sorted.map((event, index) => (
        <TimelineItem key={event.id}>
          <TimelineOppositeContent sx={{ display: { xs: 'none', sm: 'block' }, flex: 0.3 }} color="text.secondary" variant="caption">
            {formatDateTime(event.timestamp)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={DOT_COLOR[event.type]} />
            {index < sorted.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body2">{event.description}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' } }}>
              {formatDateTime(event.timestamp)}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
