import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import SitesTable from './sites-table';
import SiteDialog from './site-dialog';

const useStyles = makeStyles({
  container: {
    display: 'grid',
  },
  button: {
    justifySelf: 'end',
    marginRight: '7rem',
    transform: 'translateY(-1.8rem)',
  },
  siteCell: {
    width: '80%',
  },
  deleteCell: {
    textAlign: 'center',
  },
  emptyMessage: {
    margin: '1rem 0',
    textAlign: 'center',
  },
});

function SitesTab() {
  const classes = useStyles();
  const [openSiteDialog, setOpenSiteDialog] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<string | undefined>();

  const [sites, setSites] = useState<string[]>([]);

  const handleSiteDialogClose = () => {
    setOpenSiteDialog(false);
  };

  const onAddSiteButtonClick = () => {
    setOpenSiteDialog(true);
  };

  const handleSiteSave = (url: string, oldUrl?: string) => {
    const newSites = [...sites, url].filter((site) => site !== oldUrl);

    setSites(newSites);
    chrome.storage?.sync.set({ sites: newSites }, handleSiteDialogClose);
    setDataToEdit(undefined);
    handleSiteDialogClose();
  };

  const onSiteDeleteClick = (siteToDell: string) => {
    const newSites = [...sites].filter((site) => site !== siteToDell);
    setSites(newSites);

    chrome.storage?.sync.set({ sites: newSites });
  };

  const onSiteEdit = (site: string) => {
    setDataToEdit(site);
    setOpenSiteDialog(true);
  };

  const onDelete = (selectedSites: Record<string, boolean>) => {
    const newSites = [...sites].filter((site) => !selectedSites[site]);

    setSites(newSites);
    chrome.storage?.sync.set({ sites: newSites });
  };

  useEffect(() => {
    chrome.storage?.sync.get('sites', (data) => {
      setSites(data.sites || []);
    });
  }, []);

  return (
    <section className={classes.container}>
      <Paper>
        {sites.length ? (
          <SitesTable
            sites={sites}
            onSiteDelete={onSiteDeleteClick}
            onSiteEdit={onSiteEdit}
            onSelectedDelete={onDelete}
          />
        ) : (
          <Typography color="textSecondary" className={classes.emptyMessage}>
            No sites stored. Click the button to add a shortcut.
          </Typography>
        )}
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        onClick={onAddSiteButtonClick}
        className={classes.button}
      >
        <AddIcon />
      </Fab>
      <SiteDialog
        open={openSiteDialog}
        handleSave={handleSiteSave}
        handleClose={handleSiteDialogClose}
        storedUrls={sites}
        url={dataToEdit}
      />
    </section>
  );
}

export default SitesTab;
