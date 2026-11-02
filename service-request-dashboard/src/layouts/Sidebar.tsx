import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '../components/common/Typography';
import Tooltip from '@mui/material/Tooltip';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'Service Requests', path: '/requests', icon: <ListAltOutlinedIcon /> },
];

interface SidebarProps {
  variant: 'permanent' | 'temporary';
  open: boolean;
  collapsed?: boolean;
  onClose: () => void;
}

export default function Sidebar({ variant, open, collapsed = false, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1, px: collapsed ? 1.5 : 2 }}>
        <HomeRepairServiceOutlinedIcon color="primary" fontSize="medium" />
        {!collapsed && (
          <Typography variant="h6" noWrap color="primary" fontWeight={700}>
            ServiceDesk
          </Typography>
        )}
      </Toolbar>
      <List sx={{ px: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const button = (
            <ListItemButton
              key={item.path}
              selected={isActive}
              onClick={() => {
                navigate(item.path);
                if (variant === 'temporary') onClose();
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, color: isActive ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          );
          return collapsed ? (
            <Tooltip key={item.path} title={item.label} placement="right">
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width, boxSizing: 'border-box', transition: 'width 0.2s ease' },
      }}
    >
      {content}
    </Drawer>
  );
}
