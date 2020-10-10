import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import Shortcut from './shortcut';
import { StoredShortcutValue, ShortcutObj } from './types';

type Props = {
  shortcuts: StoredShortcutValue[];
  onShortcutDelete: (shortcutObject: ShortcutObj) => void;
};

function ShortcutsTable({ shortcuts, onShortcutDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox disabled={!Boolean(shortcuts.length)} />
          </TableCell>
          <TableCell>Shortcut</TableCell>
          <TableCell>Text</TableCell>
          <TableCell>Creation Date</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shortcuts.map((shortcut) => (
          <Shortcut key={shortcut.created} data={shortcut} onDelete={onShortcutDelete} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ShortcutsTable;
