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
}));

const MessagePage = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} fixed>
      <Typography variant="h4" gutterBottom>
        {props.message}
      </Typography>
    </Container>
  );
};

export default MessagePage;
