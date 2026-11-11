import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export function StatCardsSkeleton({ count = 6 }) {
    return (_jsx(Grid, { container: true, spacing: 2, children: Array.from({ length: count }).map((_, i) => (_jsx(Grid, { size: { xs: 12, sm: 6, md: 4, lg: 2 }, children: _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Skeleton, { variant: "text", width: "60%" }), _jsx(Skeleton, { variant: "text", width: "40%", height: 36 })] }) }) }, i))) }));
}
export function TableSkeleton({ rows = 6, columns = 7 }) {
    return (_jsx(Box, { sx: { p: 2 }, children: Array.from({ length: rows }).map((_, r) => (_jsx(Box, { sx: { display: 'flex', gap: 2, mb: 1.5 }, children: Array.from({ length: columns }).map((__, c) => (_jsx(Skeleton, { variant: "text", sx: { flex: 1 }, height: 32 }, c))) }, r))) }));
}
export function ChartSkeleton({ height = 280 }) {
    return _jsx(Skeleton, { variant: "rounded", width: "100%", height: height });
}
export function FormSkeleton() {
    return (_jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: Array.from({ length: 6 }).map((_, i) => (_jsx(Skeleton, { variant: "rounded", height: 56 }, i))) }));
}
export function DetailsSkeleton() {
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsx(Skeleton, { variant: "rounded", height: 120 }), _jsx(Skeleton, { variant: "rounded", height: 160 }), _jsx(Skeleton, { variant: "rounded", height: 200 })] }));
}
