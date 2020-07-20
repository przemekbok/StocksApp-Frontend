import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import Table from "../tables/Table";
import ShareRow from "../tables/rows/ShareRow";
import ShareHeader from "../tables/headers/ShareHeader";

import { getBoughtShares, getHeader } from "../../logic/fetching";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0, 3),
  },
}));

export default function BoughtSharesPage() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getBoughtShares().then((response) => {
      setData(response);
    });
    getHeader("shares").then((response) => {
      setHeader(response);
    });
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
        CustomTableRow={ShareRow}
        CustomTableHeader={ShareHeader}
        data={filteredData}
        header={header}
      />
    </React.Fragment>
  );
}
