import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Box from '@mui/material/Box';
import type { MonthlyDataPoint } from '../../types/dashboard.types';

interface MonthlyRequestsChartProps {
  data: MonthlyDataPoint[];
}

export default function MonthlyRequestsChart({ data }: MonthlyRequestsChartProps) {
  return (
    <Box sx={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="requests" fill="#2563eb" radius={[6, 6, 0, 0]} name="Requests" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
