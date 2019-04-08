import React, { useEffect } from "react";
//import { signin, signup } from "./fetchAuth";
import AppContext from "./appContext";
import { graphql, compose } from "react-apollo";
import loginMutation from "../mutations/login";
import signupMutation from "../mutations/signup";
import query from "../queries/user";

const appProvider = props => {
  let currentUser = null;
  let authorized = false;

  if (!props.getUser.loading) {
    currentUser = props.getUser.user;

    console.log("curUser", currentUser);
    if (currentUser !== undefined && currentUser !== null) {
      if (currentUser.token !== null) {
        console.log(currentUser);
        localStorage.setItem("token", currentUser.token);
        if (currentUser.expires !== null) {
          localStorage.setItem("expires", currentUser.expires);
        }
      }
      authorized = true;
    }
  }

  //TODO: save refresh token in localstorage
  const attemptSignup = async (email, password, username) => {
    try {
      const newUser = await props.signup({
        variables: { email, password, username }
      });

      if (newUser.data !== undefined) {
        const tokens = JSON.parse(newUser.data.signup);
        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        const expires = tokens.expires;
        props.resetStore();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refToken);
        localStorage.setItem("expires", expires);
      }
    } catch (err) {}
  };

  const attemptLogin = async (email, password) => {
    try {
      const user = await props.login({
        variables: { email, password }
      });

      if (user.data !== undefined) {
        console.log("12313");
        console.log(user.data);

        const tokens = JSON.parse(user.data.login);
        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        console.log("expireees", tokens.expires);
        const expires = tokens.expires;
        console.log(expires);

        props.resetStore();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refToken);
        localStorage.setItem("expires", expires);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = () => {
    props.resetStore();
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider
      value={{
        auth: authorized,
        signin: attemptLogin,
        user: props.getUser.user,
        signOut: signOut,
        signup: attemptSignup
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

//export default graphql(query)(graphql(mutation)(appProvider));
export default compose(
  graphql(query, { name: "getUser" }),
  graphql(signupMutation, { name: "signup" }),
  graphql(loginMutation, { name: "login" })
)(appProvider);
