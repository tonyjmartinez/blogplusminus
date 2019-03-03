import React, { useState } from "react";
import withAppContext from "../../context/withAppContext";
const signin = props => {
  const [inputValidators, setInputValidators] = useState({
    email: false,
    password: false
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
    console.log(inputValidators);
  };

  const emailValidator = email => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  const passwordValidator = password => {
    return password.trim().length > 5;
  };

  console.log(props);

  return (
    <React.Fragment>
      <input type="email" onChange={emailHandler} value={inputValues.email} />
      <input
        type="password"
        onChange={passwordHandler}
        value={inputValues.password}
      />
      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  );
};

export default withAppContext(signin);
