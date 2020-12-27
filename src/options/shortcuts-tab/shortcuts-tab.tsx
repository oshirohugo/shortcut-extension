import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import ShortcutDialog from './shortcut-dialog';
import ShortcutsTable from './shortcuts-table';
import { StoredShortcut, ShortcutObj, StoredShortcutValue } from './types';
// import { shortcutObjectMock } from './shortcut-mock'; // TODO remove this

const useStyles = makeStyles({
  container: {
    display: 'grid',
  },
  button: {
    justifySelf: 'end',
    marginRight: '7rem',
    transform: 'translateY(-1.8rem)',
  },
  emptyMessage: {
    margin: '1rem 0',
    textAlign: 'center',
  },
});

function ShortcutsTab() {
  const classes = useStyles();
  const [openShortcutDialog, setOpenShortcutDialog] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<StoredShortcutValue | undefined>();

  const handleShortcutDialogClose = () => {
    setOpenShortcutDialog(false);
  };

  const onAddShortcutButtonClick = () => {
    setOpenShortcutDialog(true);
  };

  const [shortcuts, setShortcuts] = useState<StoredShortcut>({});

  const handleShortcutSave = (shortcutObject: ShortcutObj, text: string) => {
    const { shift, keyCode, numpad } = shortcutObject;
    const newShortcuts = {
      ...shortcuts,
      [`${shift}${keyCode}${numpad}`]: { text, shortcutObject, created: new Date().getTime() },
    };

    setShortcuts(newShortcuts);
    chrome.storage?.sync.set({ shortcuts: newShortcuts }, handleShortcutDialogClose);
    setDataToEdit(undefined);
    handleShortcutDialogClose();
  };

  const onShortcutDeleteClick = (shortcutObject: ShortcutObj) => {
    const { shift, keyCode, numpad } = shortcutObject;
    const shortcutHash = `${shift}${keyCode}${numpad}`;
    const newShortcuts = { ...shortcuts };
    delete newShortcuts[shortcutHash];

    setShortcuts(newShortcuts);

    chrome.storage?.sync.set({ shortcuts: newShortcuts });
  };

  const onShortcutEdit = (shortcutData: StoredShortcutValue) => {
    setDataToEdit(shortcutData);
    setOpenShortcutDialog(true);
  };

  const onDelete = (selectedShortcuts: Record<string, boolean>) => {
    const hashes = Object.keys(selectedShortcuts);
    const newShortcuts = { ...shortcuts };

    hashes.forEach((hash) => delete newShortcuts[hash]);

    setShortcuts(newShortcuts);
    if (chrome.storage) {
      chrome.storage.sync.set({ shortcuts: newShortcuts });
    }
  };

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.sync.get('shortcuts', (data) => {
        setShortcuts(data.shortcuts);
      });
    }
  }, []);

  const shortcutsArray = shortcuts
    ? Object.keys(shortcuts as any).map((key) => shortcuts[key])
    : [];

  return (
    <section className={classes.container}>
      <Paper>
        {shortcutsArray.length ? (
          <ShortcutsTable
            shortcuts={shortcutsArray}
            onShortcutDelete={onShortcutDeleteClick}
            onShortcutEdit={onShortcutEdit}
            onSelectedDelete={onDelete}
          />
        ) : (
          <Typography color="textSecondary" className={classes.emptyMessage}>
            No shortcuts stored. Click the button to add a shortcut.
          </Typography>
        )}
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        onClick={onAddShortcutButtonClick}
        className={classes.button}
      >
        <AddIcon />
      </Fab>
      <ShortcutDialog
        open={openShortcutDialog}
        handleSave={handleShortcutSave}
        handleClose={handleShortcutDialogClose}
        shortcuts={shortcuts}
        data={dataToEdit}
      />
    </section>
  );
}

export default ShortcutsTab;
