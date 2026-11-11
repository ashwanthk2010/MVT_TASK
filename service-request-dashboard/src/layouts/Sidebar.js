import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '../components/common/Typography';
import Tooltip from '@mui/material/Tooltip';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
export const SIDEBAR_WIDTH = 220;
export const SIDEBAR_COLLAPSED_WIDTH = 76;
const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: _jsx(DashboardOutlinedIcon, {}) },
    { label: 'Service Requests', path: '/requests', icon: _jsx(ListAltOutlinedIcon, {}) },
];
export default function Sidebar({ variant, open, collapsed = false, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(selectCurrentUser);
    const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
    const content = (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', height: '100%' }, children: [variant === 'permanent' ? (_jsx(Toolbar, {})) : (_jsxs(Toolbar, { sx: { gap: 1.25, px: collapsed ? 2 : 2.5, justifyContent: collapsed ? 'center' : 'flex-start' }, children: [_jsx(Box, { sx: {
                            width: 34,
                            height: 34,
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)',
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                            flexShrink: 0,
                        }, children: _jsx(HomeRepairServiceOutlinedIcon, { sx: { fontSize: 19 } }) }), !collapsed && (_jsxs(Box, { sx: { minWidth: 0 }, children: [_jsx(Typography, { variant: "subtitle1", noWrap: true, fontWeight: 700, sx: { lineHeight: 1.2 }, children: "ServiceDesk" }), _jsx(Typography, { variant: "caption", noWrap: true, color: "text.secondary", display: "block", sx: { lineHeight: 1.2 }, children: "Admin Portal" })] }))] })), !collapsed && (_jsx(Typography, { variant: "caption", color: "text.secondary", sx: { px: 3, pt: 2, pb: 1, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.68rem' }, children: "Menu" })), _jsx(List, { sx: { px: 1.5, pt: collapsed ? 2 : 0 }, children: NAV_ITEMS.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    const button = (_jsxs(ListItemButton, { selected: isActive, onClick: () => {
                            navigate(item.path);
                            if (variant === 'temporary')
                                onClose();
                        }, sx: {
                            position: 'relative',
                            borderRadius: 2.5,
                            mb: 0.75,
                            py: 1.1,
                            px: collapsed ? 1 : 1.5,
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            color: isActive ? 'primary.main' : 'text.secondary',
                            '&:hover': { color: 'text.primary', bgcolor: 'rgba(15, 23, 42, 0.04)' },
                            '&.Mui-selected:hover': { color: 'primary.main' },
                            '&::before': isActive
                                ? {
                                    content: '""',
                                    position: 'absolute',
                                    left: -12,
                                    top: 8,
                                    bottom: 8,
                                    width: 4,
                                    borderRadius: '0 4px 4px 0',
                                    bgcolor: 'primary.main',
                                }
                                : undefined,
                        }, children: [_jsx(ListItemIcon, { sx: { minWidth: collapsed ? 0 : 36, color: 'inherit' }, children: item.icon }), !collapsed && (_jsx(ListItemText, { primary: item.label, slotProps: { primary: { noWrap: true, sx: { fontSize: '0.9rem', fontWeight: isActive ? 600 : 500 } } } }))] }, item.path));
                    return collapsed ? (_jsx(Tooltip, { title: item.label, placement: "right", children: button }, item.path)) : (button);
                }) }), _jsx(Box, { sx: { mt: 'auto', p: 1.5 }, children: _jsxs(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        p: collapsed ? 0.75 : 1.25,
                        borderRadius: 3,
                        bgcolor: '#F8FAFC',
                        border: '1px solid',
                        borderColor: 'divider',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                    }, children: [_jsx(Avatar, { sx: {
                                width: 34,
                                height: 34,
                                fontSize: 14,
                                fontWeight: 600,
                                backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
                            }, children: user?.name?.charAt(0) ?? 'A' }), !collapsed && (_jsxs(Box, { sx: { minWidth: 0 }, children: [_jsx(Typography, { variant: "body2", noWrap: true, fontWeight: 600, sx: { lineHeight: 1.3 }, children: user?.name }), _jsx(Typography, { variant: "caption", noWrap: true, color: "text.secondary", display: "block", sx: { lineHeight: 1.3 }, children: user?.email })] }))] }) })] }));
    return (_jsx(Drawer, { variant: variant, open: open, onClose: onClose, ModalProps: { keepMounted: true }, sx: {
            width,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width, boxSizing: 'border-box', transition: 'width 0.2s ease', overflowX: 'hidden' },
        }, children: content }));
}
