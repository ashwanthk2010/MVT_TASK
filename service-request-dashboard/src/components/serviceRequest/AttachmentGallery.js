import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
export default function AttachmentGallery({ attachments }) {
    const [preview, setPreview] = useState(null);
    if (attachments.length === 0) {
        return (_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }, children: [_jsx(ImageOutlinedIcon, { fontSize: "small" }), _jsx("span", { children: "No attachments uploaded for this request." })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 1.5 }, children: attachments.map((attachment) => (_jsx(Box, { onClick: () => setPreview(attachment), sx: {
                        width: 100,
                        height: 100,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.85 },
                    }, children: _jsx(Box, { component: "img", src: attachment.url, alt: attachment.name, sx: { width: '100%', height: '100%', objectFit: 'cover' } }) }, attachment.id))) }), _jsx(Dialog, { open: Boolean(preview), onClose: () => setPreview(null), maxWidth: "md", children: _jsxs(Box, { sx: { position: 'relative', bgcolor: 'black' }, children: [_jsx(IconButton, { onClick: () => setPreview(null), sx: { position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }, children: _jsx(CloseIcon, {}) }), preview && (_jsx(Box, { component: "img", src: preview.url, alt: preview.name, sx: { maxWidth: '90vw', maxHeight: '85vh', display: 'block', mx: 'auto' } }))] }) })] }));
}
