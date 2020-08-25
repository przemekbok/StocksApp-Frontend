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
const credentials = JSON.parse(localStorage.getItem("credentials")) ?? {
  email: "",
  password: "",
};

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
        status: {
          resources: "",
          wallet: "",
          rate: "",
        },
        credentials: {
          ...credentials,
          isSet: credentials.email && credentials.password ? true : false,
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
