import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import StyledTableCell from "../cells/StyledTableCell";

export default function CompanyHeader(props) {
  const { header } = props;
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="right" colSpan={10}></StyledTableCell>
        {header.map((field) => {
          if (typeof field === "object") {
            return (
              <StyledTableCell align="right" colSpan={2}>
                {Object.keys(field)[0]}
              </StyledTableCell>
            );
          }
        })}
        <StyledTableCell align="right"></StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell align="right" ></StyledTableCell>
        {header.map((field) => {
          if (typeof field !== "object") {
            return <StyledTableCell align="right">{field}</StyledTableCell>;
          } else {
            let fields = Object.values(field)[0];
            return (
              <React.Fragment>
                <StyledTableCell align="right">{fields[0]}</StyledTableCell>
                <StyledTableCell align="right">{fields[1]}</StyledTableCell>
              </React.Fragment>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}
