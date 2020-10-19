import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';

const useStyles = makeStyles({
  container: {
    width: '14rem',
  },
});

function Popup() {
  const classes = useStyles();

  const onShortcutClick = () => {
    chrome.runtime?.openOptionsPage();
  };
  return (
    <main className={classes.container}>
      <List component="nav">
        <ListItem button onClick={onShortcutClick}>
          <ListItemIcon>
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText primary="Shortcuts" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage websites" />
        </ListItem>
      </List>
    </main>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));
