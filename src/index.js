import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";
import axios from "axios";

import App from "./components/App";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import authGuard from "./components/HOCs/authGuard";
import AllCompaniesPage from "./components/pages/AllCompaniesPage";
import BoughtSharesPage from "./components/pages/BoughtSharesPage";
import AddCredentialsPage from "./components/pages/AddCredentialsPage";

const jwtToken = localStorage.getItem("JWT_TOKEN");
const credentials = JSON.parse(localStorage.getItem("credentials"));
console.log(credentials);
if (jwtToken != null) {
  axios.defaults.headers.common["Authorization"] = jwtToken;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false,
        },
        credentials: {
          email: credentials ? credentials.email : "",
          password: credentials ? credentials.password : "",
          isSet: credentials ? true : false,
        },
      },
      composeEnhancers(applyMiddleware(reduxThunk))
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route
          exact
          path="/credentials"
          component={authGuard(AddCredentialsPage)}
        ></Route>
        <Route
          exact
          path="/all-shares"
          component={authGuard(AllCompaniesPage)}
        ></Route>
        <Route
          exact
          path="/bought-shares"
          component={authGuard(BoughtSharesPage)}
        ></Route>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

function getStore() {
  let result = {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
    },
    credentials: {
      email: "",
      password: "",
      isSet: false,
    },
  };
  axios(`http://localhost:9001/credentials/get`)
    .then((response) => {
      let credentials = response.data;
      result.credentials = {
        email: credentials === undefined ? "" : credentials.email,
        password: credentials === undefined ? "" : credentials.password,
        isSet: credentials === undefined ? true : false,
      };

      return result;
    })
    .catch((err) => {
      return result;
    });
}
