import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import CustomInput from './CustomInput';
import { Alert } from '@material-ui/lab';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const { handleSubmit } = props;
  const onSubmit = async (formData) => {
    await props.signIn(formData);
    if (!props.errorMessage) {
      props.history.push('/dashboard');
    }
  };
  return (
    <div className={classes.paper}>
      <Typography variant="h3" className={classes.header}>
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Field
            name="email"
            type="text"
            id="email"
            label="Enter your email"
            placeholder="example@example.com"
            component={CustomInput}
          />
          <Field
            name="password"
            type="password"
            id="password"
            label="Enter your password"
            placeholder=""
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
          Sign In
        </Button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
