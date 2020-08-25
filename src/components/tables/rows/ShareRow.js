import React, { useState } from "react";

import TableRow from "@material-ui/core/TableRow";

import StyledTableCell from "../cells/StyledTableCell";
import ChartModalPanel from "../../modals/Chart/ChartModalPanel";
import BuyShareButtonWithModal from "../../buttons/BuyShareButtonWithModal";
import SellShareButtonWithModal from "../../buttons/SellShareButtonWithModal";

export default function ShareRow(props) {
  const { row } = props;
  const [tag, setTag] = useState();

  return (
    <TableRow key={row.name}>
      <StyledTableCell>
        <ChartModalPanel tag={tag} name={row.name} />
        <BuyShareButtonWithModal name={row.name} isin={row.isin} />
        <SellShareButtonWithModal name={row.name} isin={row.isin} />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
      {row.params.map((cell) => (
        <StyledTableCell align="right">{cell}</StyledTableCell>
      ))}
    </TableRow>
  );
}
