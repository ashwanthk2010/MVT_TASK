import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '../common/Typography';
import { formatDateTime } from '../../utils/dateUtils';
const DOT_COLOR = {
    created: 'info',
    updated: 'warning',
    status_changed: 'secondary',
    completed: 'success',
};
export default function RequestTimeline({ events }) {
    const sorted = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return (_jsx(Timeline, { sx: { p: 0, m: 0, '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 } }, children: sorted.map((event, index) => (_jsxs(TimelineItem, { children: [_jsx(TimelineOppositeContent, { sx: { display: { xs: 'none', sm: 'block' }, flex: 0.3 }, color: "text.secondary", variant: "caption", children: formatDateTime(event.timestamp) }), _jsxs(TimelineSeparator, { children: [_jsx(TimelineDot, { color: DOT_COLOR[event.type] }), index < sorted.length - 1 && _jsx(TimelineConnector, {})] }), _jsxs(TimelineContent, { children: [_jsx(Typography, { variant: "body2", children: event.description }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { display: { xs: 'block', sm: 'none' } }, children: formatDateTime(event.timestamp) })] })] }, event.id))) }));
}
