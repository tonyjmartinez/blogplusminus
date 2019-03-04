import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import withAppContext from "../../context/withAppContext";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
const logIn = props => {
  const [inputValidators, setInputValidators] = useState({
    email: true,
    password: true
  });

  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    props.context.signin(inputValues.email, inputValues.password);
  };

  const emailHandler = event => {
    const email = event.target.value;
    setInputValidators({
      ...inputValidators,
      email: emailValidator(email)
    });
    setInputValues({ ...inputValues, email: email });
  };

  const passwordHandler = event => {
    const password = event.target.value;
    setInputValidators({
      ...inputValidators,
      password: passwordValidator(password)
    });

    setInputValues({ ...inputValues, password: password });
  };

  const emailValidator = email => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  const passwordValidator = password => {
    return password.trim().length > 5;
  };

  return (
    <React.Fragment>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          onChange={emailHandler}
          value={inputValues.email}
          fullWidth
          error={inputValidators.email ? false : true}
        />
        <TextField
          margin="dense"
          id="name"
          label="Password"
          type="password"
          onChange={passwordHandler}
          value={inputValues.password}
          fullWidth
          error={inputValidators.password ? false : true}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClickClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Log In
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default withAppContext(logIn);
