import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import withAppContext from "../../context/withAppContext";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
const signUp = props => {
  const [inputValidators, setInputValidators] = useState({
    email: true,
    password: true,
    verifyPassword: true
  });

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    verifyPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

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

  const verifyPasswordHandler = event => {
    const password = event.target.value;
    setInputValidators({
      ...inputValidators,
      verifyPassword: verifyPasswordValidator(password)
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

  const verifyPasswordValidator = password => {
    if (password.trim().length < 5) {
      return false;
    }
    if (password !== inputValues.password) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    props.context.signin(inputValues.email, inputValues.password);
  };

  return (
    <React.Fragment>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          onChange={emailHandler}
          value={inputValues.email}
          fullWidth
          error={inputValidators.email ? false : true}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          onChange={passwordHandler}
          value={inputValues.password}
          fullWidth
          error={inputValidators.password ? false : true}
        />
        <TextField
          margin="dense"
          id="verify-password"
          label="Verify Password"
          type="password"
          onChange={verifyPasswordHandler}
          value={inputValues.verifyPassword}
          fullWidth
          error={inputValidators.verifyPassword ? false : true}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Sign Up
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default withAppContext(signUp);
