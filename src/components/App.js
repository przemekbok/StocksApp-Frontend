import React, { useState, useEffect } from "react";

import Header from "./Header";
import StatusBar from "./StatusBar";

import { connect } from "react-redux";
import * as actions from "../actions";

import { getStatus } from "../logic/fetching";

const App = (props) => {
  const [status, setStatus] = useState({});
  useEffect(() => {
    getStatus().then((response) => {
      setStatus(response);
    });
  }, []);
  return (
    <div>
      <Header />
      {props.isAuthenticated ? <StatusBar status={status} /> : null}
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
