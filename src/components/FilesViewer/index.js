
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileViewerDialog = ({ open, onClose, file }) => {
  const renderFile = () => {
    if (!file) return null;

    const url = URL.createObjectURL(file);

    if (file.type.startsWith('image/')) {
      return <img src={url} alt="preview" style={{ width: '100%' }} />;
    }

    if (file.type.startsWith('audio/')) {
      return <audio controls src={url} style={{ width: '100%' }} />;
    }

    if (file.type.startsWith('video/')) {
      return <video controls src={url} style={{ width: '100%' }} />;
    }

    return <p>This file type cannot be displayed.</p>;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Preview of file
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderFile()}</DialogContent>
    </Dialog>
  );
};

export default FileViewerDialog;
