import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '../common/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useNavigate } from 'react-router-dom';
import type { RecentActivity } from '../../types/dashboard.types';
import EmptyState from '../common/EmptyState';
import { formatDateTime } from '../../utils/dateUtils';

const ACTIVITY_ICON: Record<RecentActivity['type'], React.ReactElement> = {
  created: <AddCircleOutlineIcon fontSize="small" />,
  updated: <EditOutlinedIcon fontSize="small" />,
  status_changed: <SyncAltIcon fontSize="small" />,
  completed: <CheckCircleOutlineIcon fontSize="small" />,
};

const ACTIVITY_COLOR: Record<RecentActivity['type'], 'info' | 'warning' | 'secondary' | 'success'> = {
  created: 'info',
  updated: 'warning',
  status_changed: 'secondary',
  completed: 'success',
};

interface RecentActivitiesListProps {
  activities: RecentActivity[];
}

export default function RecentActivitiesList({ activities }: RecentActivitiesListProps) {
  const navigate = useNavigate();

  if (activities.length === 0) {
    return <EmptyState title="No recent activity" description="Activity will be recorded here as requests are managed." />;
  }

  return (
    <List disablePadding>
      {activities.map((activity) => (
        <ListItem
          key={activity.id}
          sx={{
            px: 1.5,
            py: 1,
            mb: 0.5,
            cursor: 'pointer',
            borderRadius: 2.5,
            transition: 'background-color .15s ease',
            '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.04)' },
          }}
          onClick={() => navigate(`/requests/${activity.requestId}`)}
        >
          <ListItemAvatar sx={{ minWidth: 48 }}>
            <Avatar
              sx={(t) => ({
                bgcolor: alpha(t.palette[ACTIVITY_COLOR[activity.type]].main, 0.12),
                color: t.palette[ACTIVITY_COLOR[activity.type]].main,
                width: 34,
                height: 34,
                borderRadius: 2.5,
              })}
            >
              {ACTIVITY_ICON[activity.type]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            slotProps={{ primary: { variant: 'body2', sx: { fontWeight: 500, color: 'text.primary' } } }}
            primary={activity.message}
            secondary={
              <Typography variant="caption" color="text.secondary">
                {formatDateTime(activity.timestamp)}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
