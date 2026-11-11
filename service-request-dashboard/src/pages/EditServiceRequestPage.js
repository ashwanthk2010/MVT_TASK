import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '../components/common/Typography';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchServiceRequestById, selectServiceRequestState, updateServiceRequest, } from '../features/serviceRequest/serviceRequestSlice';
import RequestForm from '../components/serviceRequest/RequestForm';
import { FormSkeleton } from '../components/common/LoadingSkeletons';
import { useSnackbar } from '../utils/useSnackbar';
import { isEditable } from '../utils/statusTransitions';
import { toISODateOnly } from '../utils/dateUtils';
import { logSubmittedFormData } from '../utils/submittedFormLog';
export default function EditServiceRequestPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const notify = useSnackbar();
    const { selectedRequest, loading, submitting, error } = useAppSelector(selectServiceRequestState);
    useEffect(() => {
        if (id)
            dispatch(fetchServiceRequestById(id));
    }, [dispatch, id]);
    const initialValues = useMemo(() => {
        if (!selectedRequest)
            return null;
        return {
            customerName: selectedRequest.customerName,
            email: selectedRequest.email,
            phone: selectedRequest.phone,
            serviceType: selectedRequest.serviceType,
            title: selectedRequest.title,
            description: selectedRequest.description,
            priority: selectedRequest.priority,
            requestDate: toISODateOnly(new Date(selectedRequest.requestDate)),
            address: selectedRequest.address,
        };
    }, [selectedRequest]);
    const handleSubmit = async (values, attachments) => {
        if (!id || submitting)
            return;
        try {
            const updated = await dispatch(updateServiceRequest({ id, values, attachments })).unwrap();
            logSubmittedFormData(values, attachments, { id: updated.id });
            notify(`Request ${updated.id} updated successfully.`, 'success');
            navigate(`/requests/${id}`);
        }
        catch (err) {
            notify(typeof err === 'string' ? err : 'Failed to update request.', 'error');
        }
    };
    return (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2.5 }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(IconButton, { onClick: () => navigate(id ? `/requests/${id}` : '/requests'), sx: { border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2.5 }, children: _jsx(ArrowBackIcon, {}) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h4", fontWeight: 700, children: "Edit Service Request" }), _jsx(Typography, { variant: "body2", color: "primary.main", sx: { mt: 0.25, fontWeight: 600 }, children: id })] })] }), error && _jsx(Alert, { severity: "error", children: error }), _jsx(Card, { children: _jsx(CardContent, { sx: { p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }, children: loading || !selectedRequest || !initialValues ? (_jsx(FormSkeleton, {})) : !isEditable(selectedRequest.status) ? (_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: [_jsxs(Alert, { severity: "warning", children: ["This request has status \"", selectedRequest.status, "\" and cannot be edited because it has reached a terminal state."] }), _jsx(Box, { children: _jsx(Button, { variant: "contained", onClick: () => navigate(`/requests/${id}`), children: "Back to Details" }) })] })) : (_jsx(RequestForm, { mode: "edit", initialValues: initialValues, initialAttachments: selectedRequest.attachments, submitting: submitting, onSubmit: handleSubmit, onCancel: () => navigate(`/requests/${id}`) })) }) })] }));
}
