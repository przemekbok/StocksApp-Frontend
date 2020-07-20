import React, { useState, useEffect } from "react";

import TableRow from "@material-ui/core/TableRow";

import StyledTableCell from "../cells/StyledTableCell";
import ChartModalPanel from "../../modals/Chart/ChartModalPanel";
import BuyShareButtonWithModal from "../../buttons/BuyShareButtonWithModal";
import SellShareButtonWithModal from "../../buttons/SellShareButtonWithModal";

import { getCompanies } from "../../../logic/fetching";

export default function ShareRow(props) {
  const { row } = props;
  const [tag, setTag] = useState();

  useEffect(() => {
    getCompanies().then((data) => {
      let tag = data.filter((company) => {
        company[1].includes(row.name);
      })[0];
      setTag(tag);
    });
  }, []);

  return (
    <TableRow key={row.name}>
      <StyledTableCell>
        <ChartModalPanel tag={tag} name={row.name} />
        <BuyShareButtonWithModal name={row.name} />
        <SellShareButtonWithModal name={row.name} />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row" >
        {row.name}
      </StyledTableCell>
      {row.params.map((cell) => (
        <StyledTableCell align="right">{cell}</StyledTableCell>
      ))}
    </TableRow>
  );
}
