import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

import { CircularProgress, Box, makeStyles } from "@material-ui/core";

import Table from "../tables/Table";
import ShareRow from "../tables/rows/ShareRow";
import ShareHeader from "../tables/headers/ShareHeader";

import { getBoughtShares, getHeader } from "../../logic/fetching";
import MessagePage from "./MesagePage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 1),
  },
  progressContainer: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  filter: {
    margin: theme.spacing(1, 0, 0),
  },
  label: {
    "font-family": theme.typography.button.fontFamily,
    padding: theme.spacing(2.5, 2, 1, 1),
    "text-transform": "uppercase",
  },
}));

function BoughtSharesPage(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (props.isSet) {
      getBoughtShares().then((response) => {
        setData(response);
        setIsLoading(false);
      });
      getHeader("shares").then((response) => {
        setHeader(response);
      });
    }
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  useEffect(() => {
    let filtered = data.filter((row) => {
      return row.name.toLowerCase().includes(filter);
    });
    setFilteredData(filtered);
  }, [filter]);

  const handleChange = (event) => {
    if (event.keyCode === 13) {
      setFilter(event.target.value);
    }
  };

  return props.isSet ? (
    isLoading ? (
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    ) : (
      <React.Fragment>
        <div className={classes.root}>
          <Box display="flex" justifyContent="flex-start">
            <div className={classes.label}>Filtr:</div>
            <TextField
              id="outlined-basic"
              label="Wyszukaj spółkę"
              variant="outlined"
              size="small"
              onKeyDown={handleChange}
              className={classes.filter}
            />
          </Box>
        </div>
        <Table
          CustomTableRow={ShareRow}
          CustomTableHeader={ShareHeader}
          data={filteredData}
          header={header}
        />
      </React.Fragment>
    )
  ) : (
    <MessagePage
      message="Nie podałeś danych do serwisu GPWTr@der! Formularz znajdziesz w zakładce"
      link="dane"
    />
  );
}

function mapStateToProps(state) {
  return {
    isSet: state.credentials.isSet,
  };
}

export default connect(mapStateToProps, actions)(BoughtSharesPage);
