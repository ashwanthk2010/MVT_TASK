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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, selectCurrentUser } from '../features/auth/authSlice';
import { useSnackbar } from '../utils/useSnackbar';

interface HeaderProps {
  onMenuClick: () => void;
  isDesktop: boolean;
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Header({ onMenuClick, isDesktop, sidebarCollapsed, onToggleCollapse }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          onClick={isDesktop ? onToggleCollapse : onMenuClick}
          aria-label={isDesktop ? 'toggle sidebar' : 'open navigation'}
        >
          {isDesktop && sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
          Smart Service Request Dashboard
        </Typography>
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="account menu" data-testid="profile-menu-button">
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}>
              {user?.name?.charAt(0) ?? 'A'}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem disabled>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} data-testid="logout-button">
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
