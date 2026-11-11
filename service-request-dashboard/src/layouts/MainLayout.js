import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './Sidebar';
export default function MainLayout() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const currentWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;
    return (_jsxs(Box, { sx: { display: 'flex', minHeight: '100vh' }, children: [_jsx(Header, { onMenuClick: () => setMobileOpen(true), isDesktop: isDesktop, sidebarCollapsed: collapsed, onToggleCollapse: () => setCollapsed((c) => !c) }), _jsx(Sidebar, { variant: isDesktop ? 'permanent' : 'temporary', open: isDesktop ? true : mobileOpen, collapsed: isDesktop && collapsed, onClose: () => setMobileOpen(false) }), _jsxs(Box, { component: "main", sx: {
                    flexGrow: 1,
                    width: isDesktop ? `calc(100% - ${currentWidth}px)` : '100%',
                    minWidth: 0,
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                }, children: [_jsx(Toolbar, {}), _jsx(Box, { sx: { p: { xs: 2, sm: 2.5, md: 3 }, maxWidth: 1600, mx: 'auto' }, children: _jsx(Outlet, {}) })] })] }));
}
