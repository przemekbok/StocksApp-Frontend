import React, { useState, useEffect } from "react";

import Header from "./Header";
import StatusBar from "./StatusBar";

import { getStatus } from "../logic/fetching";

export default (props) => {
  const [status, setStatus] = useState({});
  useEffect(() => {
    getStatus().then((response) => {
      setStatus(response);
    });
  }, []);
  return (
    <div>
      <Header />
      <StatusBar status={status} />
      {props.children}
    </div>
  );
};
