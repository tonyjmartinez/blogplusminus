import React from "react";
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

    if (currentUser !== undefined && currentUser !== null) {
      authorized = true;
    }
  }

  const attemptSignup = async (email, password, username) => {
    try {
      const newUser = await props.signup({
        variables: { email, password, username }
      });

      if (newUser !== undefined) {
        props.resetStore();
        localStorage.setItem("token", newUser.data.signup);
      }
    } catch (err) {}
  };

  const attemptLogin = async (email, password) => {
    try {
      const user = await props.login({
        variables: { email, password }
      });

      if (user.data !== undefined) {
        props.resetStore();
        localStorage.setItem("token", user.data.login);
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
