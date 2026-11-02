import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '../common/Typography';
import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

interface StatCardProps {
  title: string;
  count: number;
  icon: ComponentType<SvgIconProps>;
  color: 'primary' | 'info' | 'warning' | 'success' | 'secondary' | 'error';
}

export default function StatCard({ title, count, icon: Icon, color }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}.light`,
            color: `${color}.dark`,
            flexShrink: 0,
          }}
        >
          <Icon fontSize="small" />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}
          >
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {count}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
