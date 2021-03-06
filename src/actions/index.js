import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  STATUS_GET,
  CREDENTIALS_GET,
  CREDENTIALS_SET,
  CREDENTIALS_ERROR,
  BUY_SHARES,
  SELL_SHARES,
} from "./types";
import {
  update,
  signUp,
  signIn,
  getCredentials,
  setCredentials,
  buyShares,
  sellShares,
  getStatus,
} from "../logic/fetching";

export const signUpAction = (data) => {
  return async (dispatch) => {
    try {
      //const res = await axios.post("http://localhost:5000/users/signup", data);
      const res = await signUp(data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
      //get credentials from database
      let getCred = getCredentialsAction();
      await getCred(dispatch);
      //update database when logged in
      //axios("http://localhost:9001/update");
      update();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };
};

export const signOutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("credentials");

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};

export const signInAction = (data) => {
  return async (dispatch) => {
    try {
      //const res = await axios.post("http://localhost:5000/users/signin", data);
      const res = await signIn(data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
      //get credentials from database
      let getCred = getCredentialsAction();
      await getCred(dispatch);

      //update database when logged in
      //axios("http://localhost:9001/update");
      update();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Wrong credentials",
      });
      console.error("err", err);
    }
  };
};

export const getStatusAction = () => {
  return async (dispatch) => {
    try {
      const res = await getStatus();

      dispatch({
        type: STATUS_GET,
        payload: { status: res },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCredentialsAction = () => {
  return async (dispatch) => {
    try {
      //const res = await axios(`http://localhost:9001/credentials/get`); //token is provided via axios default
      const res = await getCredentials();

      dispatch({
        type: CREDENTIALS_GET,
        payload: res.data,
      });

      localStorage.setItem("credentials", JSON.stringify(res.data));
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const setCredentialsAction = (data) => {
  return async (dispatch) => {
    try {
      let oldCredentials = JSON.parse(localStorage.getItem("credentials"));
      if (
        data.email !== oldCredentials.email ||
        data.password !== oldCredentials.password
      ) {
        // const res = await axios
        //   .post(
        //     `http://localhost:9001/credentials/set`, //token is provided via axios.default
        //     data
        //   )
        //   .then((response) => {
        //     if (response) {
        //       axios("http://localhost:9001/update");
        //     }
        //     return response;
        //   });
        const res = await setCredentials(data).then((response) => {
          if (response) {
            update().then(async () => {
              let getStatusActionFunc = getStatusAction();
              await getStatusActionFunc(dispatch);
            });
          }
          return response;
        });

        dispatch({
          type: CREDENTIALS_SET,
          payload: data,
        });
        if (res) {
          localStorage.setItem("credentials", JSON.stringify(data));
        }
      }
    } catch (err) {
      dispatch({
        type: CREDENTIALS_ERROR,
        payload: err,
      });
      console.error("err", err);
    }
  };
};

export const buySharesAction = (data) => {
  return async (dispatch) => {
    try {
      // const res = await axios.post(
      //   `http://localhost:9001/trade/buy`, //token is provided via axios.default
      //   data
      // );
      const res = await buyShares(data);

      dispatch({
        type: BUY_SHARES,
        payload: res.data,
      });
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const sellSharesAction = (data) => {
  return async (dispatch) => {
    try {
      // const res = await axios.post(
      //   `http://localhost:9001/trade/sell`, //token is provided via axios.default
      //   data
      // );
      const res = await sellShares(data);

      dispatch({
        type: SELL_SHARES,
        payload: res.data,
      });
    } catch (error) {
      console.log("err", error);
    }
  };
};
