import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import Table from "../tables/Table";
import ShareRow from "../tables/rows/ShareRow";
import ShareHeader from "../tables/headers/ShareHeader";

import { getBoughtShares, getHeader } from "../../logic/fetching";
import MessagePage from "./MesagePage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 3),
  },
  progressContainer: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    if (event.keyCode == 13) {
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
          <TextField
            id="outlined-basic"
            label="Wyszukaj spółkę"
            variant="outlined"
            size="small"
            onKeyDown={handleChange}
          />
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
      message='Nie podałeś danych do dostępu! Formularz znajdziesz w zakładce
    \"credentials\"'
    />
  );
}

function mapStateToProps(state) {
  return {
    isSet: state.credentials.isSet,
  };
}

export default connect(mapStateToProps, actions)(BoughtSharesPage);
