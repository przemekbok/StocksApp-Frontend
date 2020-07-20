import React from "react";

import { withStyles } from "@material-ui/core/styles";

import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    "border-style": "none",
  },
  body: {
    fontSize: 14,
    padding: "2px",
  },
}))(TableCell);

export default StyledTableCell;
