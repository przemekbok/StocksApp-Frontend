import React, { useEffect } from "react";

import Header from "./Header";
import StatusBar from "./StatusBar";

import { connect } from "react-redux";
import * as actions from "../actions";

import { update } from "../logic/fetching";

const App = (props) => {
  const areCredentialsAvailable =
    props.credentials.email && props.credentials.password;
  useEffect(() => {
    if (window.performance) {
      //update app from GPWTrader on page refresh
      if (performance.navigation.type === 1) {
        update();
      }
    }
    if (props.isAuthenticated) {
      props.getStatusAction();
    }
  }, []);

  return (
    <div>
      <Header />
      {props.isAuthenticated ? (
        areCredentialsAvailable ? (
          <StatusBar status={props.status} />
        ) : (
          <StatusBar />
        )
      ) : null}
      {props.children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    status: state.status,
    credentials: state.credentials,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(App);
