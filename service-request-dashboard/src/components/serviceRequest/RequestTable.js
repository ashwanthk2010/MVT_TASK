import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../common/Typography';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import StatusChip from '../common/StatusChip';
import PriorityChip from '../common/PriorityChip';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateUtils';
const actionSx = (color, hoverBg) => ({
    color: 'text.secondary',
    borderRadius: 2,
    '&:hover': { color, bgcolor: hoverBg },
});
const VIEW_SX = actionSx('#0EA5E9', 'rgba(14,165,233,0.10)');
const EDIT_SX = actionSx('#4F46E5', 'rgba(79,70,229,0.10)');
const DELETE_SX = actionSx('#DC2626', 'rgba(220,38,38,0.10)');
export default function RequestTable({ requests, sortDirection, onSortChange, onDelete }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    if (requests.length === 0) {
        return (_jsx(EmptyState, { title: "No service requests found", description: "Try adjusting your search or filters, or create a new service request." }));
    }
    if (isMobile) {
        return (_jsxs(Box, { children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mb: 1.5 }, children: _jsx(TableSortLabel, { active: true, direction: sortDirection, onClick: () => onSortChange(sortDirection === 'asc' ? 'desc' : 'asc'), sx: { fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }, children: "Request ID" }) }), _jsx(Box, { sx: {
                        display: 'grid',
                        gap: 1.5,
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                    }, children: requests.map((request) => (_jsx(Card, { variant: "outlined", sx: { boxShadow: 'none' }, children: _jsxs(CardContent, { sx: { p: 2 }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }, children: [_jsxs(Box, { sx: { minWidth: 0 }, children: [_jsx(Typography, { variant: "subtitle2", fontWeight: 700, color: "primary.main", children: request.id }), _jsx(Typography, { variant: "body2", sx: { fontWeight: 500 }, children: request.customerName }), _jsx(Typography, { variant: "caption", color: "text.secondary", display: "block", sx: { overflowWrap: 'anywhere' }, children: request.email }), _jsxs(Typography, { variant: "caption", color: "text.secondary", children: [request.serviceType, " \u2022 ", formatDate(request.requestDate)] })] }), _jsx(StatusChip, { status: request.status })] }), _jsx(Box, { sx: { mt: 1.5 }, children: _jsx(PriorityChip, { priority: request.priority }) }), _jsx(Divider, { sx: { my: 1.5 } }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'flex-end', gap: 0.5 }, children: [_jsx(IconButton, { size: "small", sx: VIEW_SX, onClick: () => navigate(`/requests/${request.id}`), children: _jsx(VisibilityOutlinedIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", sx: EDIT_SX, onClick: () => navigate(`/requests/${request.id}/edit`), children: _jsx(EditOutlinedIcon, { fontSize: "small" }) }), _jsx(IconButton, { size: "small", sx: DELETE_SX, onClick: () => onDelete(request), children: _jsx(DeleteOutlineIcon, { fontSize: "small" }) })] })] }) }, request.id))) })] }));
    }
    return (_jsx(TableContainer, { sx: { overflowX: 'auto', borderRadius: 2.5, border: '1px solid', borderColor: 'divider' }, children: _jsxs(Table, { size: "small", sx: {
                tableLayout: 'fixed',
                width: '100%',
                minWidth: 860,
                '& .MuiTableCell-root': { px: 1, overflow: 'hidden' },
                '& .MuiTableCell-root:first-of-type': { pl: 2 },
                '& .MuiTableCell-root:last-of-type': { pr: 1.5 },
            }, children: [_jsxs("colgroup", { children: [_jsx("col", { style: { width: 100 } }), _jsx("col", { style: { width: 124 } }), _jsx("col", {}), _jsx("col", { style: { width: 108 } }), _jsx("col", { style: { width: 106 } }), _jsx("col", { style: { width: 98 } }), _jsx("col", { style: { width: 126 } }), _jsx("col", { style: { width: 108 } })] }), _jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { sortDirection: sortDirection, children: _jsx(TableSortLabel, { active: true, direction: sortDirection, onClick: () => onSortChange(sortDirection === 'asc' ? 'desc' : 'asc'), children: "Request ID" }) }), _jsx(TableCell, { children: "Customer Name" }), _jsx(TableCell, { children: "Email" }), _jsx(TableCell, { children: "Service Type" }), _jsx(TableCell, { children: "Request Date" }), _jsx(TableCell, { children: "Priority" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { align: "right", sx: { whiteSpace: 'nowrap' }, children: "Actions" })] }) }), _jsx(TableBody, { children: requests.map((request) => (_jsxs(TableRow, { hover: true, children: [_jsx(TableCell, { sx: { fontWeight: 600, whiteSpace: 'nowrap', color: 'primary.main' }, children: request.id }), _jsx(TableCell, { sx: { whiteSpace: 'normal', wordBreak: 'break-word', fontWeight: 500 }, children: request.customerName }), _jsx(TableCell, { sx: { whiteSpace: 'normal', overflowWrap: 'anywhere', color: 'text.secondary' }, children: request.email }), _jsx(TableCell, { sx: { whiteSpace: 'nowrap' }, children: request.serviceType }), _jsx(TableCell, { sx: { whiteSpace: 'nowrap' }, children: formatDate(request.requestDate) }), _jsx(TableCell, { children: _jsx(PriorityChip, { priority: request.priority }) }), _jsx(TableCell, { children: _jsx(StatusChip, { status: request.status }) }), _jsx(TableCell, { align: "right", sx: { whiteSpace: 'nowrap' }, children: _jsxs(Box, { sx: { display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap' }, children: [_jsx(Tooltip, { title: "View", children: _jsx(IconButton, { size: "small", "aria-label": "View", sx: VIEW_SX, onClick: () => navigate(`/requests/${request.id}`), children: _jsx(VisibilityOutlinedIcon, { fontSize: "small" }) }) }), _jsx(Tooltip, { title: "Edit", children: _jsx(IconButton, { size: "small", "aria-label": "Edit", sx: EDIT_SX, onClick: () => navigate(`/requests/${request.id}/edit`), children: _jsx(EditOutlinedIcon, { fontSize: "small" }) }) }), _jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { size: "small", "aria-label": "Delete", sx: DELETE_SX, onClick: () => onDelete(request), children: _jsx(DeleteOutlineIcon, { fontSize: "small" }) }) })] }) })] }, request.id))) })] }) }));
}
