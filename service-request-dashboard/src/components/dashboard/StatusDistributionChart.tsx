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
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
