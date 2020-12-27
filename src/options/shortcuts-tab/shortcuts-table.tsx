import React, { useState, useCallback } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Shortcut from './shortcut';
import { StoredShortcutValue } from './types';

type Props = {
  shortcuts: StoredShortcutValue[];
  onShortcutDelete: (shortcutObject: any) => void;
  onShortcutEdit: (shortcutObject: StoredShortcutValue) => void;
  onSelectedDelete: (selectedShortcuts: Record<string, boolean>) => void;
};

function ShortcutsTable({ shortcuts, onShortcutDelete, onShortcutEdit, onSelectedDelete }: Props) {
  const [selectedShortcuts, setSelectedShortcuts] = useState<Record<string, boolean>>({});
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0);

  const onShortcutSelect = (shortcutObject: any) => {
    const { shift, keyCode, numpad } = shortcutObject;
    const shortcutHash = `${shift}${keyCode}${numpad}`;
    const newSelectedShortcuts = { ...selectedShortcuts };

    if (newSelectedShortcuts[shortcutHash]) {
      delete newSelectedShortcuts[shortcutHash];
      setNumberOfSelected(numberOfSelected - 1);
    } else {
      newSelectedShortcuts[shortcutHash] = true;
      setNumberOfSelected(numberOfSelected + 1);
    }

    setSelectedShortcuts(newSelectedShortcuts);
  };

  const isShortCutSelected = ({ shortcutObject }: StoredShortcutValue) =>
    Boolean(
      selectedShortcuts[`${shortcutObject.shift}${shortcutObject.keyCode}${shortcutObject.numpad}`],
    );

  const areAllSelected = () => shortcuts.length === numberOfSelected;

  const onAllClick = () => {
    const newSelectedShortcuts = { ...selectedShortcuts };
    const allSelected = areAllSelected();

    shortcuts.forEach(({ shortcutObject }) => {
      const { shift, keyCode, numpad } = shortcutObject;
      const shortcutHash = `${shift}${keyCode}${numpad}`;

      if (allSelected) {
        delete newSelectedShortcuts[shortcutHash];
      } else {
        newSelectedShortcuts[shortcutHash] = true;
      }
    });

    setNumberOfSelected(allSelected ? 0 : shortcuts.length);
    setSelectedShortcuts(newSelectedShortcuts);
  };

  const onDeleteClick = () => onSelectedDelete(selectedShortcuts);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              disabled={!Boolean(shortcuts.length)}
              checked={areAllSelected()}
              onClick={onAllClick}
            />
          </TableCell>
          <TableCell>Shortcut</TableCell>
          <TableCell>Text</TableCell>
          <TableCell>Creation Date</TableCell>
          <TableCell>
            {numberOfSelected === 0 ? (
              'Action'
            ) : (
              <IconButton onClick={onDeleteClick}>
                <DeleteIcon />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shortcuts.map((shortcut) => (
          <Shortcut
            key={shortcut.created}
            data={shortcut}
            onDelete={onShortcutDelete}
            onEdit={onShortcutEdit}
            onSelect={onShortcutSelect}
            selected={isShortCutSelected(shortcut) || areAllSelected()}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default ShortcutsTable;
