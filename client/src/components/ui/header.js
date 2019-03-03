import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withAppContext from "../../context/withAppContext.js";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const header = props => {
  const classes = useStyles();
  console.log("header", props);
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Blog Plus Minus
          </Typography>
          <Button color="inherit">
            {props.context.auth ? "Login" : "Sign Up"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withAppContext(header);
