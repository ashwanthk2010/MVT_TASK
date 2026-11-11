import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '../common/Typography';
export default function StatCard({ title, count, icon: Icon, color }) {
    const theme = useTheme();
    const main = theme.palette[color].main;
    return (_jsx(Card, { sx: {
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
        }, children: _jsxs(CardContent, { sx: { display: 'flex', flexDirection: 'column', gap: 1.5 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", sx: { fontWeight: 500, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }, children: title }), _jsx(Box, { sx: {
                                width: 38,
                                height: 38,
                                borderRadius: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: alpha(main, 0.12),
                                color: main,
                                flexShrink: 0,
                            }, children: _jsx(Icon, { sx: { fontSize: 20 } }) })] }), _jsx(Typography, { variant: "h4", sx: { fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }, children: count })] }) }));
}
