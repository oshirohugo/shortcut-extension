import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';

type Props = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
};

const useStyles = makeStyles({
  menu: {
    width: '8rem',
  },
});

function ActionsMenu({ anchorEl, handleClose, handleDelete, handleEdit }: Props) {
  const classes = useStyles();

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
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
  );
}

export default ActionsMenu;
