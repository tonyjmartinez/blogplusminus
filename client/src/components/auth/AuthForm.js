import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import withAppContext from '../../context/withAppContext';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const AuthForm = props => {
  const [inputValidators, setInputValidators] = useState({
    email: true,
    password: true,
    verifyPassword: true,
    username: true
  });

  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    verifyPassword: '',
    username: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const emailHandler = event => {
    const email = event.target.value;
    setInputValidators({
      ...inputValidators,
      email: emailValidator(email)
    });
    setInputValues({ ...inputValues, email: email });
  };

  const usernameHandler = event => {
    const username = event.target.value;
    setInputValidators({
      ...inputValidators,
      username: usernameValidator(username)
    });
    setInputValues({ ...inputValues, username: username });
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

    setInputValues({ ...inputValues, verifyPassword: password });
  };
  const emailValidator = email => {
    // eslint-disable-next-line max-len
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  const passwordValidator = password => {
    if (
      props.type === 'signup' &&
      password.trim().length < 5 &&
      password.trim().length !== 0
    ) {
      setErrorMessage('Password must be 5 characters or longer');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const usernameValidator = username => {
    if (username.trim().length < 5 && username.trim().length !== 0) {
      setErrorMessage('Username must be 5 characters or longer');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const verifyPasswordValidator = password => {
    if (password.trim().length < 5 && password.trim().length !== 0) {
      setErrorMessage('Password must be 5 characters or longer');
      return false;
    }
    if (password !== inputValues.password) {
      setErrorMessage("Passwords don't match");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSignIn = async e => {
    e.preventDefault();
    const res = await props.context.signin(
      inputValues.email,
      inputValues.password
    );

    if (res !== null) {
      console.log(res);
      setErrorMessage(res);
    }
  };

  const handleSignUp = async e => {
    e.preventDefault();
    console.log(props.type);
    const res = await props.context.signup(
      inputValues.email,
      inputValues.password,
      inputValues.username
    );
    if (res !== null) {
      console.log(res);
      setErrorMessage(res);
    }
  };

  let verifyPassword = null;
  let username = null;
  if (props.type === 'signup') {
    verifyPassword = (
      <TextField
        margin='dense'
        id='verify-password'
        label='Verify Password'
        type='password'
        onChange={verifyPasswordHandler}
        value={inputValues.verifyPassword}
        fullWidth
        error={inputValidators.verifyPassword ? false : true}
      />
    );
    username = (
      <TextField
        margin='dense'
        id='username'
        label='Username'
        type='text'
        onChange={usernameHandler}
        value={inputValues.username}
        fullWidth
        error={inputValidators.username ? false : true}
      />
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={props.type === 'login' ? handleSignIn : handleSignUp}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            onChange={emailHandler}
            value={inputValues.email}
            fullWidth
            error={inputValidators.email ? false : true}
          />
          {username}
          <TextField
            margin='dense'
            id='password'
            label='Password'
            type='password'
            onChange={passwordHandler}
            value={inputValues.password}
            fullWidth
            error={inputValidators.password ? false : true}
          />
          {verifyPassword}
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </DialogContent>

        <DialogActions>
          <Button type='button' onClick={props.close} color='primary'>
            Cancel
          </Button>

          <Button type='submit' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </React.Fragment>
  );
};

export default withAppContext(AuthForm);
