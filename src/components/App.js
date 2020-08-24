import React, { useState, useEffect } from "react";

import Header from "./Header";
import StatusBar from "./StatusBar";

import { connect } from "react-redux";
import * as actions from "../actions";

import { update, getStatus } from "../logic/fetching";

const App = (props) => {
  const [status, setStatus] = useState({});
  const [visibleStatus, setVisibleStatus] = useState(false);
  useEffect(() => {
    if (window.performance) {
      //update app from GPWTrader on page refresh
      if (performance.navigation.type == 1) {
        update();
      }
    }
    if (props.isAuthenticated) {
      getStatus().then((response) => {
        if (response) {
          setStatus(response);
        } else {
          setVisibleStatus(true);
        }
      });
    }
  }, []);
  return (
    <div>
      <Header />
      {props.isAuthenticated ? (
        !visibleStatus ? (
          <StatusBar status={status} />
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
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(App);
