import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Typography from './Typography';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
export default function EmptyState({ title = 'No records found', description = 'There is nothing to show here yet.', icon, action, }) {
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 6,
            px: 2,
            color: 'text.secondary',
        }, children: [icon ?? (_jsx(Box, { sx: {
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'rgba(79, 70, 229, 0.08)',
                    color: 'primary.main',
                }, children: _jsx(InboxOutlinedIcon, { sx: { fontSize: 34 } }) })), _jsx(Typography, { variant: "h6", color: "text.primary", gutterBottom: true, children: title }), _jsx(Typography, { variant: "body2", sx: { maxWidth: 360 }, children: description }), action && _jsx(Box, { sx: { mt: 2 }, children: action })] }));
}
