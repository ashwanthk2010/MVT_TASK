import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import StatusChip from '../common/StatusChip';
import PriorityChip from '../common/PriorityChip';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateUtils';
export default function RecentRequestsTable({ requests }) {
    const navigate = useNavigate();
    if (requests.length === 0) {
        return _jsx(EmptyState, { title: "No recent requests", description: "New service requests will appear here." });
    }
    return (_jsx(TableContainer, { sx: { overflowX: 'auto' }, children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Request ID" }), _jsx(TableCell, { children: "Customer Name" }), _jsx(TableCell, { children: "Service Type" }), _jsx(TableCell, { children: "Request Date" }), _jsx(TableCell, { children: "Priority" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { align: "right", children: "Action" })] }) }), _jsx(TableBody, { children: requests.map((request) => (_jsxs(TableRow, { hover: true, sx: { cursor: 'pointer' }, onClick: () => navigate(`/requests/${request.id}`), children: [_jsx(TableCell, { sx: { fontWeight: 600 }, children: request.id }), _jsx(TableCell, { children: request.customerName }), _jsx(TableCell, { children: request.serviceType }), _jsx(TableCell, { children: formatDate(request.requestDate) }), _jsx(TableCell, { children: _jsx(PriorityChip, { priority: request.priority }) }), _jsx(TableCell, { children: _jsx(StatusChip, { status: request.status }) }), _jsx(TableCell, { align: "right", children: _jsx(Tooltip, { title: "View details", children: _jsx(IconButton, { size: "small", onClick: (e) => {
                                            e.stopPropagation();
                                            navigate(`/requests/${request.id}`);
                                        }, children: _jsx(VisibilityOutlinedIcon, { fontSize: "small" }) }) }) })] }, request.id))) })] }) }));
}
