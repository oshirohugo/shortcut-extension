import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { ShortcutObj, StoredShortcutValue } from './types';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSave: (shortcutObject: ShortcutObj, text: string) => void;
  data?: StoredShortcutValue;
};

function ShortcutDialog({ open, handleClose, handleSave, data }: Props) {
  const [keyCombination, setKeyCombination] = useState<string>('');
  const [shortcutObject, setShortcutObject] = useState<ShortcutObj>();
  const [text, setText] = useState<string>(data?.text || '');

  useEffect(() => {
    const existingCombination = data
      ? `Control${data.shortcutObject.shift ? ' + shift' : ''} + ${data.shortcutObject.key}`
      : '';
    setKeyCombination(existingCombination);
    setText(data?.text || '');
  }, [data]);

  const onKeyDown = (e: any) => {
    // To avoid conflicts with chrome keyboard shortcuts, we only
    // capture:
    // ctrl + shift + <digit>
    // ctrl + <numpad-digit>
    // ctrl + shift + <numpad-digit>
    // console.log(e.key, e.keyCode, e.charCode, e.type);
    // console.log(e);
    if (
      e.ctrlKey &&
      (e.nativeEvent.code.match(/^Numpad/) || (e.shiftKey && isFinite(parseInt(e.key))))
    ) {
      const keyPressed = `Control${e.shiftKey ? ' + shift' : ''} + ${e.key}`;

      const shortcut = {
        shift: e.shiftKey,
        keyCode: e.nativeEvent.code,
        key: e.key,
        numpad: Boolean(e.nativeEvent.code.match(/^Numpad/)),
      };

      setShortcutObject(shortcut);
      setKeyCombination(keyPressed);
    }
    if (e.key === 'Backspace') {
      setKeyCombination('');
    }
  };

  const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setText(event.target.value);
  };

  const resetDialogState = () => {
    setKeyCombination('');
    setShortcutObject(undefined);
    setText('');
  };

  const onSave = () => {
    if (shortcutObject) {
      handleSave(shortcutObject, text);
    }
    resetDialogState();
  };

  const onCancel = () => {
    handleClose();
    resetDialogState();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{data ? 'Edit' : 'Add'} Shortcut</DialogTitle>
      <DialogContent>
        <TextField
          disabled={Boolean(data)}
          autoFocus
          margin="dense"
          id="keys"
          label="Key combination"
          type="text"
          fullWidth
          onKeyDown={onKeyDown}
          placeholder="Press your key combination"
          value={keyCombination}
          variant="outlined"
          helperText="Only ctrl + shift + <digit> and ctrl + <numpad-digit> are accepted"
        />
        <TextField
          multiline
          margin="dense"
          id="text"
          label="Text"
          type="text"
          variant="outlined"
          value={text}
          fullWidth
          onChange={onTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShortcutDialog;
