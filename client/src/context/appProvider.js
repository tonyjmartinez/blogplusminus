import React, { useState } from "react";
import { signin } from "./fetchAuth";
import AppContext from "./appContext";

const appProvider = props => {
  const [auth, setAuth] = useState(false);

  const attemptAuth = (email, password) => {
    const authorized = status => {
      console.log(status);
      if (status) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    };
    signin(email, password, authorized);
  };

  console.log("app provider");
  return (
    <AppContext.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        signin: attemptAuth
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default appProvider;
