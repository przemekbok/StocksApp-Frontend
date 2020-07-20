import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AllCompaniesPage from './pages/AllCompaniesPage';
import BoughtSharesPage from './pages/BoughtSharesPage';
import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

const MainScreen = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Wszystkie spółki" {...allyProps(0)} />
          <Tab label="Zakupione akcje" {...allyProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AllCompaniesPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BoughtSharesPage />
      </TabPanel>
    </div>
  );
};

export default MainScreen;
