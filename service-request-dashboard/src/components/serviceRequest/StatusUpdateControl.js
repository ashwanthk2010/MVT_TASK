import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '../common/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllowedNextStatuses, reasonRequired } from '../../utils/statusTransitions';
import ConfirmDialog from '../common/ConfirmDialog';
import { useAppDispatch } from '../../app/hooks';
import { updateRequestStatus } from '../../features/serviceRequest/serviceRequestSlice';
import { useSnackbar } from '../../utils/useSnackbar';
export default function StatusUpdateControl({ requestId, currentStatus }) {
    const dispatch = useAppDispatch();
    const notify = useSnackbar();
    const [anchorEl, setAnchorEl] = useState(null);
    const [pendingStatus, setPendingStatus] = useState(null);
    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const nextStatuses = getAllowedNextStatuses(currentStatus);
    if (nextStatuses.length === 0) {
        return (_jsx(Typography, { variant: "body2", color: "text.secondary", children: "No further status changes are possible for this request." }));
    }
    const handleSelect = (status) => {
        setAnchorEl(null);
        setPendingStatus(status);
        setReason('');
        setReasonError(null);
    };
    const handleConfirm = async () => {
        if (!pendingStatus)
            return;
        const requiresReason = reasonRequired(pendingStatus);
        if (requiresReason && !reason.trim()) {
            setReasonError('A reason is required for this status change.');
            return;
        }
        setSubmitting(true);
        try {
            await dispatch(updateRequestStatus({ id: requestId, status: pendingStatus, reason: requiresReason ? reason.trim() : undefined })).unwrap();
            notify(`Status updated to "${pendingStatus}" successfully.`, 'success');
            setPendingStatus(null);
        }
        catch (err) {
            notify(typeof err === 'string' ? err : 'Failed to update status.', 'error');
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs(Box, { children: [_jsx(Button, { variant: "contained", endIcon: _jsx(ArrowDropDownIcon, {}), onClick: (e) => setAnchorEl(e.currentTarget), children: "Update Status" }), _jsx(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), children: nextStatuses.map((status) => (_jsxs(MenuItem, { onClick: () => handleSelect(status), children: ["Mark as ", status] }, status))) }), _jsx(ConfirmDialog, { open: Boolean(pendingStatus), title: `Change status to "${pendingStatus}"?`, description: `Are you sure you want to change the status of ${requestId} from "${currentStatus}" to "${pendingStatus}"?`, confirmLabel: "Update Status", loading: submitting, onConfirm: handleConfirm, onCancel: () => setPendingStatus(null), children: pendingStatus && reasonRequired(pendingStatus) && (_jsx(TextField, { label: "Reason", fullWidth: true, required: true, multiline: true, minRows: 2, sx: { mt: 2 }, value: reason, onChange: (e) => {
                        setReason(e.target.value);
                        if (reasonError)
                            setReasonError(null);
                    }, error: Boolean(reasonError), helperText: reasonError })) })] }));
}
