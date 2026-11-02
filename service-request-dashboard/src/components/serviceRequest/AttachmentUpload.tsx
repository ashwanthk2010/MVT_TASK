import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuid } from 'uuid';
import type { Attachment } from '../../types/serviceRequest.types';
import { ACCEPTED_IMAGE_TYPES, MAX_ATTACHMENTS, MAX_ATTACHMENT_SIZE_BYTES } from '../../utils/validators';

interface AttachmentUploadProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  disabled?: boolean;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function AttachmentUpload({ attachments, onChange, disabled }: AttachmentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);

    if (attachments.length + files.length > MAX_ATTACHMENTS) {
      setError(`You can upload a maximum of ${MAX_ATTACHMENTS} images.`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    let validationError: string | null = null;
    const validFiles: File[] = [];
    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        validationError = `"${file.name}" is not a supported image type.`;
        continue;
      }
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        validationError = `"${file.name}" exceeds the 5 MB size limit.`;
        continue;
      }
      validFiles.push(file);
    }

    const newAttachments: Attachment[] = [];
    for (const file of validFiles) {
      const url = await readFileAsDataUrl(file);
      newAttachments.push({ id: uuid(), name: file.name, url, size: file.size, type: file.type });
    }

    if (newAttachments.length > 0) {
      onChange([...attachments, ...newAttachments]);
    }
    setError(validationError);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(attachments.filter((a) => a.id !== id));
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        variant="outlined"
        startIcon={<UploadFileIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={disabled || attachments.length >= MAX_ATTACHMENTS}
      >
        Upload Images ({attachments.length}/{MAX_ATTACHMENTS})
      </Button>
      <FormHelperText>Optional. Maximum {MAX_ATTACHMENTS} images, up to 5 MB each.</FormHelperText>
      {error && <FormHelperText error>{error}</FormHelperText>}

      {attachments.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1.5 }}>
          {attachments.map((attachment) => (
            <Box
              key={attachment.id}
              sx={{
                position: 'relative',
                width: 96,
                height: 96,
                borderRadius: 1.5,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box
                component="img"
                src={attachment.url}
                alt={attachment.name}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemove(attachment.id)}
                disabled={disabled}
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  bgcolor: 'rgba(0,0,0,0.55)',
                  color: 'white',
                  width: 22,
                  height: 22,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
                }}
              >
                <CloseIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
