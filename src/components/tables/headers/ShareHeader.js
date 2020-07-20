import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import StyledTableCell from "../cells/StyledTableCell";

export default function ShareHeader(props) {
  const { header } = props;
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="right"></StyledTableCell>
        {header.map((field) => {
          return <StyledTableCell align="right">{field}</StyledTableCell>;
        })}
      </TableRow>
    </TableHead>
  );
}
