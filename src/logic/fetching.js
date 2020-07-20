export function getCompanies(page, size) {
  let query =
    page === undefined || size === undefined
      ? ""
      : `?page=${page}&size=${size}`;
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9001/companies" + query)
      .then((response) => response.json())
      .then((response) => {
        let rows = [];
        response.forEach((company) => {
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
    fetch(`http://localhost:9001/headers?header=${type}`)
      .then((response) => response.json())
      .then((response) => {
        resolve(response[0].fields);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getNumberOfCompanies() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9001/companies/number")
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getCompanyData(tag, interval) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:9000/stooqAPI?tag=${tag}&interval=${interval}`)
      .then((response) => response.json())
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
    fetch("http://localhost:9001/shares")
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => {
        reject(err);
      });
  });
}
