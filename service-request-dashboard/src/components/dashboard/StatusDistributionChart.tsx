import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@mui/material/Box';
import type { StatusDistributionPoint } from '../../types/dashboard.types';
import { CHART_COLORS } from '../../theme/statusColors';

interface StatusDistributionChartProps {
  data: StatusDistributionPoint[];
}

export default function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  return (
    <Box sx={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            innerRadius={62}
            outerRadius={92}
            paddingAngle={3}
            cornerRadius={6}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: '#64748B' }} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
