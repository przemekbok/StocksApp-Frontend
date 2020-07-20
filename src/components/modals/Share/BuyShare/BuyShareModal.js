import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { FormLabel } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/core/styles";

import { Formik, Form, useField } from "formik";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // width: "300px",
    // height: "400px",
    //marginTop: theme.spacing(8),
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
    flexDirection: "column",
  },
  formControl: {
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(4),
  },
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

const FormikSelect = (props) => {
  const [field, meta] = useField(props);
  return <NativeSelect {...field} {...props} />;
};

const FormikInput = (props) => {
  const [field, meta] = useField(props);
  return <TextField {...field} {...props} />;
};

export default function BuyShareModal(props) {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.open === true) {
      setOpen(true);
    }
  }, [props.open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      className={classes.modal}
    >
      <Container className={classes.modal} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <AppBar position="static">
            <Typography variant="h6">{name}</Typography>
          </AppBar>
          <Formik
            initialValues={{
              volume: 1,
              type: "Wybierz",
              validity: "Wybierz",
              limit: null,
              activationLevel: null,
              validityTime: null,
            }}
            onSubmit={(values, { setSubmitting }) => {
              let token = localStorage.getItem("JWT_TOKEN");
              let data = {
                name,
                volume: values.volume,
                type: values.type,
                validity: values.validity,
                limit: values.limit,
                activationLevel: values.activationLevel,
                validityTime: values.validityTime,
                token,
              };
              let dataAsJson = JSON.stringify(data);
              console.log(dataAsJson);
            }}
          >
            {(props) => {
              const { values } = props;
              return (
                <Form className={classes.form}>
                  <FormControl className={classes.formControl} fullWidth>
                    <FormLabel>Ilość</FormLabel>
                    <FormikInput name="volume" />
                  </FormControl>
                  <FormControl className={classes.formControl} fullWidth>
                    <FormLabel>Typ</FormLabel>
                    <FormikSelect name="type">
                      <option aria-label="None" value="">
                        Wybierz
                      </option>
                      {Object.keys(types).map((key) => (
                        <option value={key}>{types[key]}</option>
                      ))}
                    </FormikSelect>
                  </FormControl>
                  {values.type === "LIMIT" || values.type === "STOP_LIMIT" ? (
                    <FormControl className={classes.formControl} fullWidth>
                      <FormLabel>Limit</FormLabel>
                      <FormikInput name="limit" />
                    </FormControl>
                  ) : null}
                  {values.type === "STOP_LIMIT" ||
                  values.type === "STOP_LOSS" ? (
                    <FormControl className={classes.formControl} fullWidth>
                      <FormLabel>Limit aktywacji</FormLabel>
                      <FormikInput name="activationLevel" />
                    </FormControl>
                  ) : null}
                  <FormControl className={classes.formControl} fullWidth>
                    <FormLabel>Ważność</FormLabel>
                    <FormikSelect name="validity">
                      <option aria-label="None" value="">
                        Wybierz
                      </option>
                      {Object.keys(validity).map((key) => (
                        <option value={key}>{validity[key]}</option>
                      ))}
                    </FormikSelect>
                  </FormControl>
                  {values.validity.includes("WDC") ||
                  values.validity.includes("WDD") ? (
                    <FormControl className={classes.formControl} fullWidth>
                      <FormLabel>Ważność</FormLabel>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {values.validity.includes("WDD") ? (
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd:MM:yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={values.validityTime}
                            onChange={(value) =>
                              props.setFieldValue("validityTime", value)
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        ) : null}
                        {values.validity.includes("WDC") ? (
                          <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={values.validityTime}
                            onChange={(value) =>
                              props.setFieldValue("validityTime", value)
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change time",
                            }}
                          />
                        ) : null}
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  ) : null}

                  <Button
                    fullWidth
                    className={classes.button}
                    type="submit"
                    color="primary"
                  >
                    Kup
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Modal>
  );
}
