import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withAppContext from "../../context/withAppContext.js";
import AuthDialog from "./AuthDialog";

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
  const auth = props.context.auth;
  const user = props.context.user;
  console.log(user);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  const openDialog = type => {
    setAuthType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSignOut = event => {
    props.context.signOut();
    closeDialog();
  };

  let authButtons = null;
  if (auth === "authorized") {
    if (user !== undefined) {
      authButtons = (
        <div>
          <Button onClick={() => console.log(props)} color="inherit">
            {user.username}
          </Button>

          <Button onClick={handleSignOut} color="inherit">
            Sign Out
          </Button>
        </div>
      );
    }
  } else if (auth === "unauthorized") {
    authButtons = (
      <div>
        <AuthDialog
          open={dialogOpen}
          onClickOpen={openDialog}
          onClickClose={closeDialog}
          type={authType}
        />
        <Button onClick={() => openDialog("login")} color="inherit">
          Log In
        </Button>
        <Button onClick={() => openDialog("signup")} color="inherit">
          Sign Up
        </Button>
      </div>
    );
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Blog Plus{"/"}Minus
          </Typography>
          {authButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withAppContext(header);
