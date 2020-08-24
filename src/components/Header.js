import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as actions from "../actions";

const useStyles = makeStyles((theme) => ({
  toolbox: {
    display: "flex",
  },
  dashboardButton: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  link: {
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const signOut = () => {
    props.signOutAction();
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GPW Trader Panel</Typography>

          <div className={classes.dashboardButton}>
            {props.isAuthenticated ? (
              <div>
                <Button>
                  <Link to="/all-shares" className={classes.link}>
                    Akcje
                  </Link>
                </Button>
                <Button>
                  <Link to="/bought-shares" className={classes.link}>
                    Portfel
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>

          {!props.isAuthenticated ? (
            <div>
              <Button>
                <Link to="/signup" className={classes.link}>
                  Zarejestruj się
                </Link>
              </Button>
              <Button>
                <Link to="/signin" className={classes.link}>
                  Zaloguj się
                </Link>
              </Button>
            </div>
          ) : null}
          {props.isAuthenticated ? (
            <div>
              <Button>
                <Link to="/credentials" className={classes.link}>
                  Dane
                </Link>
              </Button>
              <Button>
                <Link to="/signout" className={classes.link} onClick={signOut}>
                  Wyloguj się
                </Link>
              </Button>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
