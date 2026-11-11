import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import EmptyState from '../common/EmptyState';
import { formatDateTime } from '../../utils/dateUtils';
const ACTIVITY_ICON = {
    created: _jsx(AddCircleOutlineIcon, { fontSize: "small" }),
    updated: _jsx(EditOutlinedIcon, { fontSize: "small" }),
    status_changed: _jsx(SyncAltIcon, { fontSize: "small" }),
    completed: _jsx(CheckCircleOutlineIcon, { fontSize: "small" }),
};
const ACTIVITY_COLOR = {
    created: 'info',
    updated: 'warning',
    status_changed: 'secondary',
    completed: 'success',
};
export default function RecentActivitiesList({ activities }) {
    const navigate = useNavigate();
    if (activities.length === 0) {
        return _jsx(EmptyState, { title: "No recent activity", description: "Activity will be recorded here as requests are managed." });
    }
    return (_jsx(List, { disablePadding: true, children: activities.map((activity) => (_jsxs(ListItem, { sx: {
                px: 1.5,
                py: 1,
                mb: 0.5,
                cursor: 'pointer',
                borderRadius: 2.5,
                transition: 'background-color .15s ease',
                '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.04)' },
            }, onClick: () => navigate(`/requests/${activity.requestId}`), children: [_jsx(ListItemAvatar, { sx: { minWidth: 48 }, children: _jsx(Avatar, { sx: (t) => ({
                            bgcolor: alpha(t.palette[ACTIVITY_COLOR[activity.type]].main, 0.12),
                            color: t.palette[ACTIVITY_COLOR[activity.type]].main,
                            width: 34,
                            height: 34,
                            borderRadius: 2.5,
                        }), children: ACTIVITY_ICON[activity.type] }) }), _jsx(ListItemText, { slotProps: { primary: { variant: 'body2', sx: { fontWeight: 500, color: 'text.primary' } } }, primary: activity.message, secondary: _jsx(Typography, { variant: "caption", color: "text.secondary", children: formatDateTime(activity.timestamp) }) })] }, activity.id))) }));
}
