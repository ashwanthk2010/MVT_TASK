import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '../components/common/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectCurrentUser } from '../features/auth/authSlice';
import { useSnackbar } from '../utils/useSnackbar';
export default function Header({ onMenuClick, isDesktop, sidebarCollapsed, onToggleCollapse }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const notify = useSnackbar();
    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(logout());
        notify('You have been logged out.', 'info');
        navigate('/login', { replace: true });
    };
    return (_jsx(AppBar, { position: "fixed", color: "inherit", elevation: 0, sx: {
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: (t) => t.zIndex.drawer + 1,
        }, children: _jsxs(Toolbar, { sx: { gap: 1.5 }, children: [_jsx(IconButton, { edge: "start", onClick: isDesktop ? onToggleCollapse : onMenuClick, "aria-label": isDesktop ? 'toggle sidebar' : 'open navigation', sx: { color: 'text.secondary', borderRadius: 2.5, '&:hover': { color: 'primary.main', bgcolor: 'rgba(79,70,229,0.08)' } }, children: isDesktop && sidebarCollapsed ? _jsx(MenuOpenIcon, {}) : _jsx(MenuIcon, {}) }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.25, flexGrow: 1, minWidth: 0 }, children: [_jsx(Box, { sx: {
                                width: 34,
                                height: 34,
                                borderRadius: 2.5,
                                display: { xs: 'none', sm: 'flex' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)',
                                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                                flexShrink: 0,
                            }, children: _jsx(HomeRepairServiceOutlinedIcon, { sx: { fontSize: 19 } }) }), _jsx(Typography, { variant: "h6", noWrap: true, sx: { fontWeight: 600, color: 'text.primary' }, children: "Smart Service Request Dashboard" })] }), _jsxs(Box, { children: [_jsx(IconButton, { onClick: (e) => setAnchorEl(e.currentTarget), "aria-label": "account menu", "data-testid": "profile-menu-button", sx: { p: 0.5, border: '1px solid', borderColor: 'divider', '&:hover': { borderColor: 'primary.light' } }, children: _jsx(Avatar, { sx: {
                                    width: 32,
                                    height: 32,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
                                }, children: user?.name?.charAt(0) ?? 'A' }) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, slotProps: { paper: { sx: { mt: 1, minWidth: 220 } } }, children: [_jsxs(Box, { sx: { px: 2, py: 1.25 }, children: [_jsx(Typography, { variant: "subtitle2", children: user?.name }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: user?.email })] }), _jsx(Divider, {}), _jsxs(MenuItem, { disabled: true, children: [_jsx(ListItemIcon, { children: _jsx(PersonOutlineIcon, { fontSize: "small" }) }), "Profile"] }), _jsxs(MenuItem, { onClick: handleLogout, "data-testid": "logout-button", sx: { color: 'error.main' }, children: [_jsx(ListItemIcon, { sx: { color: 'inherit' }, children: _jsx(LogoutIcon, { fontSize: "small" }) }), "Logout"] })] })] })] }) }));
}
