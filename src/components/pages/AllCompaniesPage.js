import React, { useState, useEffect } from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

//import { makeStyles } from "@material-ui/core";

import Table from "../tables/Table";
import CompanyRow from "../tables/rows/CompanyRow";
import CompanyHeader from "../tables/headers/CompanyHeader";

import { getCompanies, getHeader } from "../../logic/fetching";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 1),
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

function AllCompaniesPage() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getCompanies().then((response) => {
      setData(response);
    });
    getHeader("companies").then((response) => {
      setHeader(response);
    });
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  useEffect(() => {
    let filtered = data.filter((row) => {
      return row[1].toLowerCase().includes(filter);
    });
    setFilteredData(filtered);
  }, [filter]);

  const handleChange = (event) => {
    if (event.keyCode === 13) {
      setFilter(event.target.value);
    }
  };

  return (
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
        CustomTableRow={CompanyRow}
        CustomTableHeader={CompanyHeader}
        data={filteredData}
        header={header}
      />
    </React.Fragment>
  );
}

export default connect(null, actions)(AllCompaniesPage);
