import { jsx as _jsx } from "react/jsx-runtime";
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import { PRIORITY_COLOR_MAP } from '../../theme/statusColors';
export default function PriorityChip({ priority, size = 'small' }) {
    const theme = useTheme();
    const colorKey = PRIORITY_COLOR_MAP[priority];
    const main = colorKey === 'default' ? theme.palette.grey[500] : theme.palette[colorKey].main;
    const text = colorKey === 'default' ? theme.palette.grey[700] : theme.palette[colorKey].dark;
    return (_jsx(Chip, { label: priority, size: size, variant: "outlined", icon: _jsx(FlagRoundedIcon, { sx: { fontSize: '14px !important', color: `${main} !important` } }), sx: {
            color: text,
            borderColor: alpha(main, 0.35),
            bgcolor: '#fff',
            maxWidth: '100%',
        } }));
}
