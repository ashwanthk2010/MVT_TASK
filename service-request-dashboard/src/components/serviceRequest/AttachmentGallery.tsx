import { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import type { Attachment } from '../../types/serviceRequest.types';

interface AttachmentGalleryProps {
  attachments: Attachment[];
}

export default function AttachmentGallery({ attachments }: AttachmentGalleryProps) {
  const [preview, setPreview] = useState<Attachment | null>(null);

  if (attachments.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
        <ImageOutlinedIcon fontSize="small" />
        <span>No attachments uploaded for this request.</span>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {attachments.map((attachment) => (
          <Box
            key={attachment.id}
            onClick={() => setPreview(attachment)}
            sx={{
              width: 100,
              height: 100,
              borderRadius: 1.5,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              '&:hover': { opacity: 0.85 },
            }}
          >
            <Box component="img" src={attachment.url} alt={attachment.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        ))}
      </Box>

      <Dialog open={Boolean(preview)} onClose={() => setPreview(null)} maxWidth="md">
        <Box sx={{ position: 'relative', bgcolor: 'black' }}>
          <IconButton
            onClick={() => setPreview(null)}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,0.4)' }}
          >
            <CloseIcon />
          </IconButton>
          {preview && (
            <Box
              component="img"
              src={preview.url}
              alt={preview.name}
              sx={{ maxWidth: '90vw', maxHeight: '85vh', display: 'block', mx: 'auto' }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}
