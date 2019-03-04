import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LogIn from "../auth/Login";

const AuthDialog = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.type}</DialogTitle>
        <LogIn />
      </Dialog>
    </div>
  );
};

export default AuthDialog;
