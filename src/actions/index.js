import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,
  DASHBOARD_GET_DATA,
  CREDENTIALS_GET,
  CREDENTIALS_SET,
  CREDENTIALS_ERROR,
  BUY_SHARES,
  SELL_SHARES,
} from "./types";

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/users/signup", data);

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
      //get credentials from database
      let getCred = getCredentials();
      await getCred(dispatch);
      //update database when logged in
      axios("http://localhost:9001/update");
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is alredy in use",
      });
      console.error("err", err);
    }
  };
};

export const signOut = () => {
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

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/users/signin", data);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
      //get credentials from database
      let getCred = getCredentials();
      await getCred(dispatch);

      //update database when logged in
      axios("http://localhost:9001/update");
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Wrong credentials",
      });
      console.error("err", err);
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios("http://localhost:5000/users/secret");

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const getCredentials = () => {
  return async (dispatch) => {
    try {
      const res = await axios(`http://localhost:9001/credentials/get`); //token is provided via axios default
      console.log(res.data);
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

export const setCredentials = (data) => {
  return async (dispatch) => {
    try {
      let oldCredentials = JSON.parse(localStorage.getItem("credentials"));
      if (
        data.email !== oldCredentials.email ||
        data.password !== oldCredentials.password
      ) {
        const res = await axios
          .post(
            `http://localhost:9001/credentials/set`, //token is provided via axios.default
            data
          )
          .then((response) => {
            if (response) {
              axios("http://localhost:9001/update");
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
      //return res;
    } catch (err) {
      dispatch({
        type: CREDENTIALS_ERROR,
        payload: err,
      });
      console.error("err", err);
    }
  };
};

export const buyShares = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:9001/trade/buy`, //token is provided via axios.default
        data
      );

      dispatch({
        type: BUY_SHARES,
        payload: res.data,
      });
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const sellShares = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `http://localhost:9001/trade/sell`, //token is provided via axios.default
        data
      );

      dispatch({
        type: SELL_SHARES,
        payload: res.data,
      });
    } catch (error) {
      console.log("err", error);
    }
  };
};
