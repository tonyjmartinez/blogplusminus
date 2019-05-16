import React, { useEffect, useState } from "react";
import AppContext from "./appContext";
import { graphql, compose } from "react-apollo";
import loginMutation from "../mutations/login";
import signupMutation from "../mutations/signup";
import newPostMutation from "../mutations/newPost";
import query from "../queries/user";
import recentPosts from "../queries/recentPosts";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../themes/theme";

const appProvider = props => {
  console.log(props);
  let currentUser = null;
  let authorized = false;

  console.log("appProvider", props);
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState(0);
  const [postsLeft, setPostsLeft] = useState(true);

  document.body.style = `background: ${darkMode ? "grey" : "white"}`;

  if (!props.getUser.loading) {
    currentUser = props.getUser.user;

    if (currentUser !== undefined && currentUser !== null) {
      if (currentUser.token !== null) {
        localStorage.setItem("token", currentUser.token);
        if (currentUser.expires !== null) {
          localStorage.setItem("expires", currentUser.expires);
        }
      }
      authorized = true;
    }
  }

  const attemptSignup = async (email, password, username) => {
    try {
      const newUser = await props.signup({
        variables: { email, password, username }
      });

      if (newUser.data !== undefined) {
        let tokens = null;
        try {
          tokens = JSON.parse(newUser.data.signup);
        } catch (err) {
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
    }
  };

  const attemptLogin = async (email, password) => {
    try {
      const user = await props.login({
        variables: { email, password }
      });

      if (user.data !== undefined) {
        let tokens = null;

        try {
          tokens = JSON.parse(user.data.login);
        } catch (err) {
          return user.data.login;
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
    }
  };

  const newPost = async (userId, title, content) => {
    console.log("new post");
    const post = await props
      .newPost({
        variables: {
          postInput: {
            userId,
            title,
            content
          }
        }
      })
      .then(res => {
        console.log("res");
        props.recentPosts.refetch();
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
          darkMode,
          recentPosts: props.recentPosts
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
  graphql(recentPosts, { name: "recentPosts" }),
  graphql(signupMutation, { name: "signup" }),
  graphql(loginMutation, { name: "login" }),
  graphql(newPostMutation, { name: "newPost" })
)(appProvider);
