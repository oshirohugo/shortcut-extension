import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSave: (newUrl: string, oldUrl?: string) => void;
  storedUrls: string[];
  url?: string;
};

function SiteDialog({ open, handleClose, handleSave, storedUrls, url }: Props) {
  const [newUrl, setNewUrl] = useState<string>(url || '');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setNewUrl(url || '');
  }, [url]);

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputUrl = event.target.value;
    setNewUrl(inputUrl);
    if (storedUrls.includes(inputUrl)) {
      setError('Already on the list');
    } else {
      setError('');
    }
  };

  const resetDialogState = () => {
    setNewUrl('');
    setError('');
  };

  const onKeyPress = (e: any) => {
    if (e.charCode === 13 && !error) {
      onSave();
    }
  };

  const onSave = () => {
    if (newUrl && newUrl !== url) {
      handleSave(newUrl, url);
    } else {
      handleClose();
    }
    resetDialogState();
  };

  const onCancel = () => {
    handleClose();
    resetDialogState();
  };

  const isSaveDisabled = () => !newUrl || Boolean(error);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{url ? 'Edit' : 'Add'} Site</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="text"
          label="Url"
          type="text"
          variant="outlined"
          value={newUrl}
          fullWidth
          onChange={onTextChange}
          onKeyPress={onKeyPress}
          helperText={error}
          error={Boolean(error)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button variant="outlined" onClick={onSave} color="primary" disabled={isSaveDisabled()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SiteDialog;
