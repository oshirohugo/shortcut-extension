import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Site from './site';

type Props = {
  sites: string[];
  onSiteDelete: (site: string) => void;
  onSiteEdit: (site: string) => void;
  onSelectedDelete: (selectedSites: Record<string, boolean>) => void;
};

function SitesTable({ sites, onSiteDelete, onSiteEdit, onSelectedDelete }: Props) {
  const [numberOfSelected, setNumberOfSelected] = useState<number>(0);
  const [selectedSites, setSelectedSites] = useState<Record<string, boolean>>({});

  const onSiteSelect = (site: string) => {
    const newSelectedSites = { ...selectedSites };

    if (newSelectedSites[site]) {
      delete newSelectedSites[site];
      setNumberOfSelected(numberOfSelected - 1);
    } else {
      newSelectedSites[site] = true;
      setNumberOfSelected(numberOfSelected + 1);
    }

    setSelectedSites(newSelectedSites);
  };

  const isSiteSelected = (site: string) => Boolean(selectedSites[site]);

  const areAllSelected = () => sites.length === numberOfSelected;

  const onAllClick = () => {
    const allSelected = areAllSelected();

    const newSelectedSites = allSelected
      ? {}
      : sites.reduce(
          (selectedGroup, site) => ({
            ...selectedGroup,
            [site]: true,
          }),
          {},
        );

    setNumberOfSelected(allSelected ? 0 : sites.length);
    setSelectedSites(newSelectedSites);
  };

  const onDeleteClick = () => {
    onSelectedDelete(selectedSites);
    setSelectedSites({});
    setNumberOfSelected(0);
  };

  return (
    <Table size="small">
      <TableHead>
        <TableCell>
          <Checkbox
            disabled={!Boolean(sites.length)}
            checked={areAllSelected()}
            onClick={onAllClick}
          />
        </TableCell>
        <TableCell>Site</TableCell>
        <TableCell>
          {numberOfSelected === 0 ? (
            'Action'
          ) : (
            <IconButton onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      </TableHead>
      <TableBody>
        {sites.map((site) => (
          <Site
            key={site}
            url={site}
            onDelete={onSiteDelete}
            onEdit={onSiteEdit}
            onSelect={onSiteSelect}
            selected={isSiteSelected(site) || areAllSelected()}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default SitesTable;
