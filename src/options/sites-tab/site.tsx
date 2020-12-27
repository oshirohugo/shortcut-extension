import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import ActionsMenu from '../actions-menu';

type Props = {
  url: string;
  selected: boolean;
  onDelete: (site: string) => void;
  onEdit: (site: string) => void;
  onSelect: (site: string) => void;
};

const useStyles = makeStyles({
  siteCell: {
    width: '90%',
  },
  deleteCell: {
    textAlign: 'center',
  },
});

function Site({ url, selected, onDelete, onEdit, onSelect }: Props) {
  const classes = useStyles();
  const [actionsAnchorEl, setActionsAnchorEl] = React.useState<null | HTMLElement>(null);

  const onActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(url);
    handleActionsClose();
  };

  const handleEdit = () => {
    onEdit(url);
    handleActionsClose();
  };

  const handleSelect = () => {
    onSelect(url);
  };

  return (
    <TableRow key={url}>
      <TableCell>
        <Checkbox onClick={handleSelect} checked={selected} />
      </TableCell>
      <TableCell className={classes.siteCell}>{url}</TableCell>
      <TableCell className={classes.deleteCell}>
        <IconButton onClick={onActionsClick}>
          <MoreVertIcon />
        </IconButton>
        <ActionsMenu
          anchorEl={actionsAnchorEl}
          handleClose={handleActionsClose}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </TableCell>
    </TableRow>
  );
}

export default Site;
