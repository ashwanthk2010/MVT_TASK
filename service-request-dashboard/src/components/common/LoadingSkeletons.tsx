import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function StatCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" height={36} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function TableSkeleton({ rows = 6, columns = 7 }: { rows?: number; columns?: number }) {
  return (
    <Box sx={{ p: 2 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <Box key={r} sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
          {Array.from({ length: columns }).map((__, c) => (
            <Skeleton key={c} variant="text" sx={{ flex: 1 }} height={32} />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export function ChartSkeleton({ height = 280 }: { height?: number }) {
  return <Skeleton variant="rounded" width="100%" height={height} />;
}

export function FormSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={56} />
      ))}
    </Box>
  );
}

export function DetailsSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="rounded" height={120} />
      <Skeleton variant="rounded" height={160} />
      <Skeleton variant="rounded" height={200} />
    </Box>
  );
}
