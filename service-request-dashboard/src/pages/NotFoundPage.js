import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Typography from '../components/common/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
export default function NotFoundPage() {
    const navigate = useNavigate();
    return (_jsxs(Box, { sx: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            px: 2,
            textAlign: 'center',
        }, children: [_jsx(Typography, { variant: "h2", fontWeight: 700, color: "primary", children: "404" }), _jsx(Typography, { variant: "h6", children: "Page not found" }), _jsx(Button, { variant: "contained", onClick: () => navigate('/dashboard'), children: "Go to Dashboard" })] }));
}
