import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShortcutsTab from './shortcuts-tab';
import SitesTab from './sites-tab';

const useStyles = makeStyles({
  container: {
    display: 'grid',
  },
  content: {
    justifySelf: 'center',
    width: '1048px',
    display: 'grid',
  },
  button: {
    justifySelf: 'end',
    marginRight: '1rem',
    transform: 'translateY(-1.8rem)',
  },
  emptyMessage: {
    margin: '1rem 0',
    textAlign: 'center',
  },
});

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Options() {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Shorcuts" {...a11yProps(0)} />
          <Tab label="Manage Websites" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <ShortcutsTab />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SitesTab />
        </TabPanel>
      </div>
    </section>
  );
}

ReactDOM.render(<Options />, document.getElementById('root'));
