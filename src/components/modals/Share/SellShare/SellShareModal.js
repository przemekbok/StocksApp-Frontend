import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container"

import { makeStyles } from "@material-ui/core/styles";

import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
  modal: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: 'column',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // width: "300px",
    // height: "400px",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
  },
  form: {
    marginTop: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },
  button:{
    marginTop: theme.spacing(4),
  }
}));

const types = {
  LIMIT: "LIMIT",
  PKC: "PKC",
  STOP_LIMIT: "STOP LIMIT",
  STOP_LOSS: "STOP LOSS",
};

const validity = {
  WDC: "Do określonego czasu (WDC)",
  WDD: "Do oznaczonego dnia (WDD)",
  WDA: "Na czas nieoznaczony (WDA)",
  D: "Na dzień bieżący (D)",
  WNF: "Na fixing (WNF)",
  WNZ: "Na zamknięcie (WNZ)",
};

export default function BuyShareModal(props) {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      instrument: "",
      volume: 1,
      type: "Wybierz",
      validity: "Wybierz",
    },
    onSubmit: (values) => {},
  });

  const handleClose = () => {
    setOpen(false);
    props.open = false;
  };

  useEffect(() => {
    if (props.open === true) {
      setOpen(true);
    }
  }, [props.open]);

  return (
    <Modal open={open} onClose={handleClose} onBackdropClick={handleClose} className={classes.modal}>
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <AppBar position="static">
          <Typography variant="h6">{name}</Typography>
        </AppBar>
        <form className={classes.form}>
          <FormControl fullWidth>
            <TextField value={1} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Typ</InputLabel>
            <NativeSelect>
              <option aria-label="None" value=""></option>
              {Object.keys(types).map((key) => (
                <option value={key}>{types[key]}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Ważność</InputLabel>
            <NativeSelect >
            <option aria-label="None" value=""></option>
              {Object.keys(validity).map((key) => (
                <option value={key}>{validity[key]}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <Button fullWidth className={classes.button} type="submit" color="primary">
            Sprzedaj
          </Button>
        </form>
      </div>
      </Container>
    </Modal>
  );
}
