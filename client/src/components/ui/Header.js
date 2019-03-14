import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withAppContext from "../../context/withAppContext.js";
import AuthDialog from "./AuthDialog";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  fab: {
    margin: "10px"
  },
  extendedIcon: {
    marginRight: "5px"
  },
  fabText: {
    marginRight: "10px"
  }
});

const header = props => {
  const auth = props.context.auth;
  const user = props.context.user;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  const classes = useStyles();
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
          <Fab
            variant="extended"
            color="secondary"
            size="small"
            className={classes.fab}
            aria-label="New"
          >
            <AddIcon className={classes.extendedIcon} />
            <span className={classes.fabText}>New Post</span>
          </Fab>
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

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className={classes.link}>
              Blog Plus{"/"}Minus
            </Link>
          </Typography>
          {authButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withAppContext(header);
