import { jsx as _jsx } from "react/jsx-runtime";
import MuiTypography, {} from '@mui/material/Typography';
export default function Typography({ fontWeight, display, sx, ...rest }) {
    const extraSx = {
        ...(fontWeight !== undefined ? { fontWeight } : {}),
        ...(display !== undefined ? { display } : {}),
    };
    return _jsx(MuiTypography, { sx: [extraSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])], ...rest });
}
