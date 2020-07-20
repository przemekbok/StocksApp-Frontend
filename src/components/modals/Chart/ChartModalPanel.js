import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ShowChartIcon from "@material-ui/icons/ShowChart";

import { makeStyles } from "@material-ui/core/styles";

import { getCompanyData } from "../../../logic/fetching";
import { parseDataForChart } from "../../../logic/parser";

import Chart from "../../chart/Chart";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "1200px",
    height: "600px",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ChartModalPanel(props) {
  const classes = useStyles();

  const { tag, name } = props;
  const [interval, setInterval] = useState("d");
  const [companyData, setCompanyData] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    getCompanyData(tag, interval).then((response) => {
      let parsedData = parseDataForChart(response.data);
      setCompanyData(parsedData);
      setOpen(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.interval !== undefined) {
      setInterval(props.interval);
    }
  }, [props.interval]);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <ShowChartIcon />
      </Button>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <AppBar position="static">
            <Typography variant="h6">{name}</Typography>
          </AppBar>
          <Chart data={companyData} />
        </div>
      </Modal>
    </React.Fragment>
  );
}
