import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ShortcutObj, StoredShortcutValue } from './types';
import Tooltip from '@material-ui/core/Tooltip';
import ActionsMenu from './actions-menu';

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
};

function Shortcut({ data, onDelete }: Props) {
  const classes = useStyles();
  const [actionsAnchorEl, setActionsAnchorEl] = React.useState<null | HTMLElement>(null);

  const { shift, key } = data.shortcutObject;
  const { text, created } = data;

  const onActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(data.shortcutObject);
    handleActionsClose();
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell>{`Control${shift ? ' + shift' : ''} + ${key}`}</TableCell>
      <Tooltip PopperProps={{ className: classes.textTooltip }} interactive title={text}>
        <TableCell className={classes.textCell}>{text}</TableCell>
      </Tooltip>
      <TableCell>{new Date(created).toLocaleString()}</TableCell>
      <TableCell>
        <IconButton onClick={onActionsClick}>
          <MoreVertIcon />
        </IconButton>
        <ActionsMenu
          anchorEl={actionsAnchorEl}
          handleClose={handleActionsClose}
          handleDelete={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
}

export default Shortcut;