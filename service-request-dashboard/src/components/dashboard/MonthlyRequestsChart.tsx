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
          <defs>
            <linearGradient id="monthlyBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.85} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#EEF2F7" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(79, 70, 229, 0.06)' }}
            contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }}
          />
          <Bar dataKey="requests" fill="url(#monthlyBar)" radius={[8, 8, 0, 0]} maxBarSize={36} name="Requests" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
