import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";

import SellShareModal from "../modals/Share/SellShare/SellShareModal";

export default function BuyShareButtonWithModal(props) {
  const { name, isin } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <RemoveIcon />
      </Button>
      <SellShareModal open={open} name={name} isin={isin} />
    </React.Fragment>
  );
}
