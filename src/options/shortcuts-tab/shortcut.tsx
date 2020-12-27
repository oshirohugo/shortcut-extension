import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ShortcutObj, StoredShortcutValue } from './types';
import Tooltip from '@material-ui/core/Tooltip';
import ActionsMenu from '../common/actions-menu';

const useStyles = makeStyles({
  textCell: {
    maxWidth: '12rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  textTooltip: {
    whiteSpace: 'pre-wrap',
  },
});

type Props = {
  data: StoredShortcutValue;
  onDelete: (shortcutObject: ShortcutObj) => void;
  onEdit: (data: StoredShortcutValue) => void;
  onSelect: (shortcutObject: ShortcutObj) => void;
  selected: boolean;
};

function Shortcut({ data, onDelete, onEdit, onSelect, selected }: Props) {
  const classes = useStyles();

  const { shift, key } = data.shortcutObject;
  const { text, created } = data;

  const handleSelect = () => {
    onSelect(data.shortcutObject);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox onClick={handleSelect} checked={selected} />
      </TableCell>
      <TableCell>{`Control${shift ? ' + shift' : ''} + ${key}`}</TableCell>
      <Tooltip PopperProps={{ className: classes.textTooltip }} interactive title={text}>
        <TableCell className={classes.textCell}>{text}</TableCell>
      </Tooltip>
      <TableCell>{new Date(created).toLocaleString()}</TableCell>
      <TableCell>
        <ActionsMenu<ShortcutObj, StoredShortcutValue>
          onDelete={onDelete}
          onEdit={onEdit}
          toEdit={data}
          toDelete={data.shortcutObject}
        />
      </TableCell>
    </TableRow>
  );
}

export default Shortcut;
