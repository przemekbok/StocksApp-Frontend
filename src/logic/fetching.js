import axios from "axios";

var authApiUrl = "http://localhost:5000";
var gpwtraderApiUrl = "http://localhost:9001";
var stooqApiUrl = "http://localhost:9000/stooqAPI";
if (process.env.NODE_ENV === "production") {
  authApiUrl = process.env.REACT_APP_ELECTRON
    ? authApiUrl
    : process.env.REACT_APP_AUTH_API;
  gpwtraderApiUrl = process.env.REACT_APP_ELECTRON
    ? gpwtraderApiUrl
    : process.env.REACT_APP_GPWT_API;
  stooqApiUrl = process.env.REACT_APP_STOOQ_API;
}

export function getCompanies(page, size) {
  let query =
    page === undefined || size === undefined
      ? ""
      : `?page=${page}&size=${size}`;
  return new Promise((resolve, reject) => {
    axios
      .get(`${gpwtraderApiUrl}/companies${query}`)
      .then((response) => {
        let rows = [];
        response.data.forEach((company) => {
          let row = [company.isin, company.name, ...company.params];
          rows.push(row);
        });
        resolve(rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getHeader(type) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${gpwtraderApiUrl}/headers?header=${type}`)
      .then((response) => {
        resolve(response.data.fields);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCompanyData(tag, interval) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${stooqApiUrl}/stooqAPI?tag=${tag}&interval=${interval}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getBoughtShares() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${gpwtraderApiUrl}/shares/`)
      .then((response) => response.data)
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}

export function getStatus() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${gpwtraderApiUrl}/status/`)
      .then((response) => response.data)
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}

export function update() {
  axios.get(`${gpwtraderApiUrl}/update`);
}

export function signUp(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${authApiUrl}/users/signup`, data)
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}

export function signIn(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${authApiUrl}/users/signin`, data)
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCredentials() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${gpwtraderApiUrl}/credentials/get`)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function setCredentials(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${gpwtraderApiUrl}/credentials/set`, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function buyShares(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${gpwtraderApiUrl}/trade/buy`, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

export function sellShares(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${gpwtraderApiUrl}/trade/sell`, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}
