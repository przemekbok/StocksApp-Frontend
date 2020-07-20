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
    props.signOut();
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GPW Trader Panel</Typography>

          <div className={classes.dashboardButton}>
            {props.isAuth ? (
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

          {!props.isAuth ? (
            <div>
              <Button>
                <Link to="/signup" className={classes.link}>
                  Sign Up
                </Link>
              </Button>
              <Button>
                <Link to="/signin" className={classes.link}>
                  Sign In
                </Link>
              </Button>
            </div>
          ) : null}
          {props.isAuth ? (
            <Button>
              <Link to="/signout" className={classes.link} onClick={signOut}>
                Log Out
              </Link>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, actions)(Header);
