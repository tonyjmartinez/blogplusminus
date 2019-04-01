import React, { useState, useEffect } from "react";
import { signin, signup } from "./fetchAuth";
import { tokenSignin } from "./fetchAuth";
import AppContext from "./appContext";
import axios from "../axios-users.js";

const appProvider = props => {
  const initialUser = {
    username: "",
    email: ""
  };

  const [auth, setAuth] = useState("");
  const [user, setUser] = useState(initialUser);

  const attemptSignup = (email, password, username) => {
    const success = (status, user) => {
      if (status) {
        setUser({ username: user.username });
        setAuth("authorized");
      } else {
        setAuth("unauthorized");
      }
    };
    signup(email, password, username, success);
  };

  const attemptSignin = (email, password) => {
    const authorized = (status, user) => {
      if (status) {
        setUser({ username: user.username });
        setAuth("authorized");
      } else {
        setAuth("unauthorized");
      }
    };
    signin(email, password, authorized);
  };

  const attemptAuth = () => {
    console.log("attemptauth");
    setAuth(localStorage.getItem("token"));
    //tokenSignin((status, user) => {
    //  console.log(status, user);
    //  setAuth(status);
    //  setUser({ username: user.username });
    //});
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setAuth("unauthorized");
  };

  return (
    <AppContext.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        signin: attemptSignin,
        setUser: setUser,
        attemptAuth: attemptAuth,
        user: user,
        signOut: signOut,
        signup: attemptSignup
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default appProvider;
