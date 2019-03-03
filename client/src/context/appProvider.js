import React, { useState } from "react";
import { signin } from "./fetchAuth";
import { tokenSignin } from "./fetchAuth";
import AppContext from "./appContext";

const appProvider = props => {
  const initialUser = {
    email: ""
  };

  const [auth, setAuth] = useState("");
  const [user, setUser] = useState(initialUser);

  const attemptSignin = (email, password) => {
    const authorized = status => {
      console.log(status);
      if (status) {
        setAuth("authorized");
        setUser({ email: email });
      } else {
        setAuth("error");
      }
    };
    signin(email, password, authorized);
  };

  const attemptAuth = () => {
    tokenSignin((status, user) => {
      console.log(status);
      console.log(user);
      setAuth(status);
      setUser({ email: user });
    });
  };

  console.log("app provider");
  return (
    <AppContext.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        signin: attemptSignin,
        setUser: setUser,
        attemptAuth: attemptAuth,
        user: user
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default appProvider;
