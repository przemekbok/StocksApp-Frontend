import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core"; //this one imports default theme
//import { makeStyles } from "@material-ui/styles";
//**this one above doesnt import default theme */

//const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  "status-bar": {
    //background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    display: "flex",
    "align-items": "center",
    border: 0,
    borderRadius: 3,
    "font-family": theme.typography.button.fontFamily,
    //boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}`,
    color: "white",
    height: 48,
    padding: "0 30px",
    "text-transform": "uppercase",
  },
  "rate-positive": {
    color: theme.palette.success.light,
  },
  "rate-negative": {
    color: theme.palette.error.light,
  },
  big: { "font-weight": 1000, padding: " 0 0 0 10px" },
}));

const StatusBar = (props) => {
  console.log(props.status);
  const { resources, wallet, rate } = props.status;
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end" className={classes.container}>
      <div className={classes["status-bar"]}>
        Portfel: <div className={classes.big}>{resources}</div>
      </div>
      <div className={classes["status-bar"]}>
        Razem: <div className={classes.big}>{wallet}</div>
      </div>
      <div className={classes["status-bar"]}>
        Wynik:{" "}
        <div
          className={[
            classes.big,
            rate?.includes("-")
              ? classes["rate-negative"]
              : classes["rate-positive"],
          ].join(" ")}
        >
          {rate}
        </div>
      </div>
    </Box>
  );
};

export default StatusBar;
