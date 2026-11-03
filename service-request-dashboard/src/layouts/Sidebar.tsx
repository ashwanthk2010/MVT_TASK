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
  const user = useAppSelector(selectCurrentUser);
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {variant === 'permanent' ? (
        <Toolbar />
      ) : (
      <Toolbar sx={{ gap: 1.25, px: collapsed ? 2 : 2.5, justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <Box
          sx={{
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
          }}
        >
          <HomeRepairServiceOutlinedIcon sx={{ fontSize: 19 }} />
        </Box>
        {!collapsed && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" noWrap fontWeight={700} sx={{ lineHeight: 1.2 }}>
              ServiceDesk
            </Typography>
            <Typography variant="caption" noWrap color="text.secondary" display="block" sx={{ lineHeight: 1.2 }}>
              Admin Portal
            </Typography>
          </Box>
        )}
      </Toolbar>
      )}

      {!collapsed && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 3, pt: 2, pb: 1, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.68rem' }}
        >
          Menu
        </Typography>
      )}

      <List sx={{ px: 1.5, pt: collapsed ? 2 : 0 }}>
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
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: 'inherit' }}>{item.icon}</ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { noWrap: true, sx: { fontSize: '0.9rem', fontWeight: isActive ? 600 : 500 } } }}
                />
              )}
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

      <Box sx={{ mt: 'auto', p: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            p: collapsed ? 0.75 : 1.25,
            borderRadius: 3,
            bgcolor: '#F8FAFC',
            border: '1px solid',
            borderColor: 'divider',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: 14,
              fontWeight: 600,
              backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
            }}
          >
            {user?.name?.charAt(0) ?? 'A'}
          </Avatar>
          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" noWrap fontWeight={600} sx={{ lineHeight: 1.3 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" noWrap color="text.secondary" display="block" sx={{ lineHeight: 1.3 }}>
                {user?.email}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
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
        [`& .MuiDrawer-paper`]: { width, boxSizing: 'border-box', transition: 'width 0.2s ease', overflowX: 'hidden' },
      }}
    >
      {content}
    </Drawer>
  );
}
