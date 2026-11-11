import { jsx as _jsx } from "react/jsx-runtime";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import { STATUS_COLOR_MAP } from '../../theme/statusColors';
export default function StatusChip({ status, size = 'small' }) {
    const theme = useTheme();
    const colorKey = STATUS_COLOR_MAP[status];
    const main = colorKey === 'default' ? theme.palette.grey[500] : theme.palette[colorKey].main;
    const text = colorKey === 'default' ? theme.palette.grey[700] : theme.palette[colorKey].dark;
    return (_jsx(Chip, { label: status, size: size, icon: _jsx(Box, { component: "span", sx: { width: 6, height: 6, borderRadius: '50%', bgcolor: main, ml: '8px !important' } }), sx: {
            bgcolor: alpha(main, 0.12),
            color: text,
            border: `1px solid ${alpha(main, 0.22)}`,
            maxWidth: '100%',
            '& .MuiChip-label': { pl: 0.75 },
        } }));
}
