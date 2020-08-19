import axios from "axios";

var gpwtraderApiUrl = "http://localhost:9001";
var stooqApiUrl = "http://localhost:9000/stooqAPI";
if (process.env.NODE_ENV === "production") {
  gpwtraderApiUrl = process.env.REACT_APP_GPWT_API;
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
