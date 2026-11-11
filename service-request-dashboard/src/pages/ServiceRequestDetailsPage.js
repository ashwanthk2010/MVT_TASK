import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import HistoryIcon from '@mui/icons-material/History';
import { alpha } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteServiceRequest, fetchServiceRequestById, selectServiceRequestState, } from '../features/serviceRequest/serviceRequestSlice';
import StatusChip from '../components/common/StatusChip';
import PriorityChip from '../components/common/PriorityChip';
import StatusUpdateControl from '../components/serviceRequest/StatusUpdateControl';
import RequestTimeline from '../components/serviceRequest/RequestTimeline';
import AttachmentGallery from '../components/serviceRequest/AttachmentGallery';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { DetailsSkeleton } from '../components/common/LoadingSkeletons';
import { useSnackbar } from '../utils/useSnackbar';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { isEditable } from '../utils/statusTransitions';
function InfoRow({ label, value }) {
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 0.25, sm: 2 },
            py: 1.25,
            borderBottom: '1px dashed',
            borderColor: 'divider',
            '&:last-of-type': { borderBottom: 0 },
        }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", sx: { width: { sm: 160 }, flexShrink: 0, fontWeight: 500 }, children: label }), _jsx(Typography, { variant: "body2", sx: { fontWeight: 500, wordBreak: 'break-word', color: 'text.primary' }, children: value })] }));
}
function SectionTitle({ icon, title, color = 'primary' }) {
    return (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.25 }, children: [_jsx(Box, { sx: (t) => {
                    const main = t.palette[color]?.main ?? t.palette.primary.main;
                    return {
                        width: 32,
                        height: 32,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(main, 0.12),
                        color: main,
                    };
                }, children: icon }), _jsx(Typography, { variant: "subtitle1", fontWeight: 700, children: title })] }));
}
export default function ServiceRequestDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const notify = useSnackbar();
    const { selectedRequest, loading, submitting, error } = useAppSelector(selectServiceRequestState);
    const [deleteOpen, setDeleteOpen] = useState(false);
    useEffect(() => {
        if (id)
            dispatch(fetchServiceRequestById(id));
    }, [dispatch, id]);
    const handleDelete = async () => {
        if (!id)
            return;
        try {
            await dispatch(deleteServiceRequest(id)).unwrap();
            notify(`Request ${id} deleted successfully.`, 'success');
            navigate('/requests');
        }
        catch (err) {
            notify(typeof err === 'string' ? err : 'Failed to delete request.', 'error');
        }
    };
    if (loading || !selectedRequest) {
        return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: [error && _jsx(Alert, { severity: "error", children: error }), _jsx(DetailsSkeleton, {})] }));
    }
    const request = selectedRequest;
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(IconButton, { onClick: () => navigate('/requests'), sx: { border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2.5 }, children: _jsx(ArrowBackIcon, {}) }), _jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }, children: [_jsx(Typography, { variant: "h4", fontWeight: 700, children: request.id }), _jsx(StatusChip, { status: request.status, size: "medium" })] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", sx: { mt: 0.25 }, children: ["Created on ", formatDate(request.createdAt)] })] })] }), _jsxs(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(EditOutlinedIcon, {}), disabled: !isEditable(request.status), onClick: () => navigate(`/requests/${request.id}/edit`), children: "Edit" }), _jsx(Button, { variant: "outlined", color: "error", startIcon: _jsx(DeleteOutlineIcon, {}), onClick: () => setDeleteOpen(true), children: "Delete" })] })] }), !isEditable(request.status) && (_jsxs(Alert, { severity: "info", children: ["This request has status \"", request.status, "\" and can no longer be edited."] })), _jsxs(Grid, { container: true, spacing: 2.5, children: [_jsx(Grid, { size: { xs: 12, md: 8 }, children: _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: [_jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1, flexWrap: 'wrap' }, children: [_jsx(SectionTitle, { icon: _jsx(DescriptionOutlinedIcon, { fontSize: "small" }), title: "Request Information" }), _jsxs(Box, { sx: { display: 'flex', gap: 1 }, children: [_jsx(PriorityChip, { priority: request.priority }), _jsx(StatusChip, { status: request.status })] })] }), _jsx(Divider, { sx: { mb: 0.5 } }), _jsx(InfoRow, { label: "Request Title", value: request.title }), _jsx(InfoRow, { label: "Service Category", value: request.serviceType }), _jsx(InfoRow, { label: "Description", value: request.description }), _jsx(InfoRow, { label: "Created Date", value: formatDate(request.createdAt) }), _jsx(InfoRow, { label: "Last Updated", value: formatDateTime(request.updatedAt) })] }) }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(SectionTitle, { icon: _jsx(PersonOutlineIcon, { fontSize: "small" }), title: "Customer Information", color: "secondary" }), _jsx(Divider, { sx: { mt: 1.5, mb: 0.5 } }), _jsx(InfoRow, { label: "Name", value: request.customerName }), _jsx(InfoRow, { label: "Email", value: request.email }), _jsx(InfoRow, { label: "Phone", value: request.phone }), _jsx(InfoRow, { label: "Address", value: request.address })] }) }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(SectionTitle, { icon: _jsx(AttachFileIcon, { fontSize: "small" }), title: "Attachments", color: "info" }), _jsx(Divider, { sx: { mt: 1.5, mb: 2 } }), _jsx(AttachmentGallery, { attachments: request.attachments })] }) })] }) }), _jsx(Grid, { size: { xs: 12, md: 4 }, children: _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: [_jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(SectionTitle, { icon: _jsx(SyncAltIcon, { fontSize: "small" }), title: "Status Management", color: "warning" }), _jsx(Divider, { sx: { mt: 1.5, mb: 2 } }), _jsx(StatusUpdateControl, { requestId: request.id, currentStatus: request.status })] }) }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(SectionTitle, { icon: _jsx(HistoryIcon, { fontSize: "small" }), title: "Request Timeline", color: "success" }), _jsx(Divider, { sx: { mt: 1.5, mb: 1.5 } }), _jsx(RequestTimeline, { events: request.timeline })] }) })] }) })] }), _jsx(ConfirmDialog, { open: deleteOpen, title: "Delete Service Request", description: `Are you sure you want to delete request ${request.id}? This action cannot be undone.`, confirmLabel: "Delete", confirmColor: "error", loading: submitting, onConfirm: handleDelete, onCancel: () => setDeleteOpen(false) })] }));
}
