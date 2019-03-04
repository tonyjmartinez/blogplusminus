import React, { useState } from "react";
import { signin } from "./fetchAuth";
import { tokenSignin } from "./fetchAuth";
import AppContext from "./appContext";

const appProvider = props => {
  const initialUser = {
    username: "",
    email: ""
  };

  const [auth, setAuth] = useState("");
  const [user, setUser] = useState(initialUser);

  const attemptSignin = (email, password) => {
    const authorized = (status, user) => {
      if (status) {
        setAuth("authorized");
        setUser({ email: email, username: user.username });
      } else {
        setAuth("unauthorized");
      }
    };
    signin(email, password, authorized);
  };

  const attemptAuth = () => {
    tokenSignin((status, user) => {
      setAuth(status);
      setUser({ username: user });
    });
  };

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
