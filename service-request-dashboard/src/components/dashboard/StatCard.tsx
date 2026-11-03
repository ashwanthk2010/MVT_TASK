import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const main = theme.palette[color].main;

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 10px 24px ${alpha(main, 0.14)}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '0 0 auto 0',
          height: 3,
          bgcolor: main,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(main, 0.12),
              color: main,
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 20 }} />
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}
