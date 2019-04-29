import React, { useEffect, useState } from "react";
//import { signin, signup } from "./fetchAuth";
import AppContext from "./appContext";
import { graphql, compose } from "react-apollo";
import loginMutation from "../mutations/login";
import signupMutation from "../mutations/signup";
import newPostMutation from "../mutations/newPost";
import query from "../queries/user";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../themes/theme";

const appProvider = props => {
  let currentUser = null;
  let authorized = false;
  console.log(props);

  const [darkMode, setDarkMode] = useState(true);

  document.body.style = `background: ${darkMode ? "grey" : "white"}`;

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
      console.log("attempt signup");
      const newUser = await props.signup({
        variables: { email, password, username }
      });
      console.log(newUser.data);

      if (newUser.data !== undefined) {
        let tokens = null;
        try {
          tokens = JSON.parse(newUser.data.signup);
        } catch (err) {
          console.log(newUser.data.signup);
          return newUser.data.signup;
        }

        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        const expires = tokens.expires;
        props.resetStore();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refToken);
        localStorage.setItem("expires", expires);
        return null;
      }
    } catch (err) {
      console.log(err);
      console.log("error 2");
    }
  };

  const attemptLogin = async (email, password) => {
    try {
      const user = await props.login({
        variables: { email, password }
      });

      if (user.data !== undefined) {
        console.log(user.data);
        let tokens = null;

        try {
          tokens = JSON.parse(user.data.login);
          console.log(tokens);
        } catch (err) {
          return user.data.login;
        }

        console.log(tokens);

        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        console.log("expireees", tokens.expires);
        const expires = tokens.expires;
        console.log(expires);

        props.resetStore();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refToken);
        localStorage.setItem("expires", expires);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newPost = async (userId, title, content) => {
    const post = await props.newPost({
      variables: {
        postInput: {
          userId,
          title,
          content
        }
      }
    });
  };

  const signOut = () => {
    props.resetStore();
    localStorage.removeItem("token");
  };

  return (
    <MuiThemeProvider theme={theme(darkMode)}>
      <AppContext.Provider
        value={{
          auth: authorized,
          signin: attemptLogin,
          user: props.getUser.user,
          signOut: signOut,
          signup: attemptSignup,
          newPost,
          setDarkMode,
          darkMode
        }}
      >
        {props.children}
      </AppContext.Provider>
    </MuiThemeProvider>
  );
};

//export default graphql(query)(graphql(mutation)(appProvider));
export default compose(
  graphql(query, { name: "getUser" }),
  graphql(signupMutation, { name: "signup" }),
  graphql(loginMutation, { name: "login" }),
  graphql(newPostMutation, { name: "newPost" })
)(appProvider);
