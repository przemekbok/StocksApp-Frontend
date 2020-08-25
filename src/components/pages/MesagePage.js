import React from "react";

import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  big: {
    "font-weight": 1000,
    padding: " 0 0 0 10px",
    "text-transform": "uppercase",
  },
}));

const MessagePage = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} fixed>
      <Typography variant="h4" gutterBottom>
        {props.message}
        <u className={classes.big}>{props.link}</u>
      </Typography>
    </Container>
  );
};

export default MessagePage;
