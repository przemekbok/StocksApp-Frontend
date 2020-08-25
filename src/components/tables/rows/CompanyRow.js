import React from "react";

import TableRow from "@material-ui/core/TableRow";

import StyledTableCell from "../cells/StyledTableCell";
import ChartModalPanel from "../../modals/Chart/ChartModalPanel";

import BuyShareButtonWithModal from "../../buttons/BuyShareButtonWithModal";

export default function CompanyRow(props) {
  const { row } = props;
  return (
    <TableRow key={row[0]}>
      <StyledTableCell>
        <ChartModalPanel tag={row[0].substr(2, 3)} name={row[1]} />
        <BuyShareButtonWithModal name={row[1]} isin={row[0]} />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row[1]}
      </StyledTableCell>
      {row.slice(2).map((cell) => (
        <StyledTableCell align="right">{cell}</StyledTableCell>
      ))}
    </TableRow>
  );
}
