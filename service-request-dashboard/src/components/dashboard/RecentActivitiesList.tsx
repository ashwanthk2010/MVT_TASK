import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
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

const ACTIVITY_COLOR: Record<RecentActivity['type'], string> = {
  created: 'info.main',
  updated: 'warning.main',
  status_changed: 'secondary.main',
  completed: 'success.main',
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
          sx={{ px: 0, cursor: 'pointer', borderRadius: 1 }}
          onClick={() => navigate(`/requests/${activity.requestId}`)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: ACTIVITY_COLOR[activity.type], width: 36, height: 36 }}>
              {ACTIVITY_ICON[activity.type]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
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
