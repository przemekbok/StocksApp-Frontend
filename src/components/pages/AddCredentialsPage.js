import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../actions";

import CustomInput from "../CustomInput";
import { Alert } from "@material-ui/lab";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  fieldset: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
  },
  textfieldTop: {
    margin: theme.spacing(3, 0, 0),
  },
  textfieldBottom: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const AddCredentialsPage = (props) => {
  const classes = useStyles();
  const { handleSubmit, email, password } = props;
  const onSubmit = (formData) => {
    props.setCredentials(formData);
  };

  useEffect(() => {
    props.initialize({ email, password });
  }, []);

  return (
    <div className={classes.paper}>
      <Typography variant="h6" className={classes.header}>
        Twoje dane do logowania w serwisie GPWTrader
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={classes.fieldset}>
          <Field
            className={classes.textfieldTop}
            name="email"
            type="text"
            id="email"
            placeholder="Twój email"
            component={CustomInput}
          />
          <Field
            className={classes.textfieldBottom}
            name="password"
            type="text"
            id="password"
            placeholder="Twoje hasło"
            component={CustomInput}
          />
        </fieldset>
        {props.errorMessage ? (
          <Alert severity="error">{props.errorMessage}</Alert>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Zapisz dane
        </Button>
      </form>
    </div>
  );
};

//TODO: Do redux for data

function mapStateToProps(state) {
  return {
    email: state.credentials.email,
    password: state.credentials.password,
    errorMessage: state.credentials.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "credentials" }) //we are naming redux form for redux form reducer
)(AddCredentialsPage);
