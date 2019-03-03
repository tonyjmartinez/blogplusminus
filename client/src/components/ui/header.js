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
  console.log(props.context);
  const auth = props.context.auth;
  const user = props.context.user.email;

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  let authButtons = null;

  if (auth === "authorized") {
    if (user !== undefined) {
      authButtons = <Button color="inherit">{user}</Button>;
    }
  } else if (auth === "unauthorized") {
    authButtons = (
      <div>
        <AuthDialog
          open={dialogOpen}
          onClickOpen={openDialog}
          onClickClose={closeDialog}
        />
        <Button onClick={openDialog} color="inherit">
          Log In
        </Button>
        <Button color="inherit">Sign Up</Button>
      </div>
    );
  }

  const classes = useStyles();
  console.log("header", props);
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Blog Plus Minus
          </Typography>
          {authButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withAppContext(header);
