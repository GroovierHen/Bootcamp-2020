import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="textSecondary"
            >
              Shoe Store
            </Link>
          </Typography>
          <div>
            <Link component={RouterLink} to="/launch" color="textSecondary">
              Launch
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
