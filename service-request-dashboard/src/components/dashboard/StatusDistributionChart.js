import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Box from '@mui/material/Box';
import { CHART_COLORS } from '../../theme/statusColors';
export default function StatusDistributionChart({ data }) {
    return (_jsx(Box, { sx: { width: '100%', height: 280 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, dataKey: "count", nameKey: "status", innerRadius: 62, outerRadius: 92, paddingAngle: 3, cornerRadius: 6, stroke: "none", children: data.map((entry, index) => (_jsx(Cell, { fill: CHART_COLORS[index % CHART_COLORS.length] }, entry.status))) }), _jsx(Tooltip, { contentStyle: { borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' } }), _jsx(Legend, { iconType: "circle", iconSize: 8, wrapperStyle: { fontSize: 12, color: '#64748B' } })] }) }) }));
}
