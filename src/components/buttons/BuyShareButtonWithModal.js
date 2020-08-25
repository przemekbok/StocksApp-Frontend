import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import BuyShareModal from "../modals/Share/BuyShare/BuyShareModal";

export default function BuyShareButtonWithModal(props) {
  const { name, isin } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <AddIcon />
      </Button>
      <BuyShareModal
        open={open}
        name={name}
        isin={isin}
        onBackdropClick={handleClose}
      />
    </React.Fragment>
  );
}
