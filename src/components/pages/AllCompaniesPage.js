import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import Table from "../tables/Table";
import CompanyRow from "../tables/rows/CompanyRow";
import CompanyHeader from "../tables/headers/CompanyHeader";

import { getCompanies, getHeader } from "../../logic/fetching";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 3),
  },
}));

export default function AllCompaniesPage() {
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
    if (event.keyCode == 13) {
      setFilter(event.target.value);
    }
  };

  return (
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
        CustomTableRow={CompanyRow}
        CustomTableHeader={CompanyHeader}
        data={filteredData}
        header={header}
      />
    </React.Fragment>
  );
}
