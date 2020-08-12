import axios from "axios";

/**TODO: Change fetching mechanism to axios*/

export function getCompanies(page, size) {
  let query =
    page === undefined || size === undefined
      ? ""
      : `?page=${page}&size=${size}`;
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:9001/companies" + query)
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
      .get(`http://localhost:9001/headers?header=${type}`)
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
      .get(`http://localhost:9000/stooqAPI?tag=${tag}&interval=${interval}`)
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
      .get(`http://localhost:9001/shares/`)
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
      .get(`http://localhost:9001/status/`)
      .then((response) => response.data)
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}
