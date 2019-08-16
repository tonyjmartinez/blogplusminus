import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthForm from '../auth/AuthForm';

const AuthDialog = props => {
  let title;
  if (props.type === 'login') {
    title = 'Log In';
  } else if (props.type === 'signup') {
    title = 'Sign Up';
  } else {
    title = 'Error';
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <AuthForm type={props.type} close={props.onClickClose} />
      </Dialog>
    </div>
  );
};

export default AuthDialog;
