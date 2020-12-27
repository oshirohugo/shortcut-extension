import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

type Props<T, U> = {
  onDelete: (element: T) => void;
  onEdit: (element: U) => void;
  toDelete: T;
  toEdit: U;
};

const useStyles = makeStyles({
  menu: {
    width: '8rem',
  },
});

function ActionsMenu<T, U>({ onDelete, onEdit, toEdit, toDelete }: Props<T, U>) {
  const classes = useStyles();
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);

  const onActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchorEl(null);
  };

  const handleClose = () => {
    setActionsAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(toDelete);
    handleActionsClose();
  };

  const handleEdit = () => {
    onEdit(toEdit);
    handleActionsClose();
  };

  return (
    <>
      <IconButton onClick={onActionsClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={actionsAnchorEl}
        keepMounted
        open={Boolean(actionsAnchorEl)}
        onClose={handleClose}
        classes={{
          paper: classes.menu,
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionsMenu;
