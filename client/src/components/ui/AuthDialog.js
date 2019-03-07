import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AuthForm from "../auth/AuthForm";

const AuthDialog = props => {
  let title;
  if (props.type === "login") {
    title = "Log In";
  } else if (props.type === "signup") {
    title = "Sign Up";
  } else {
    title = "Error";
  }

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <AuthForm type={props.type} close={props.onClickClose} />
      </Dialog>
    </div>
  );
};

export default AuthDialog;
