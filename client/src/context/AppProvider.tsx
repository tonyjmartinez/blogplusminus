import React, { useState, ReactNode, PropsWithChildren } from 'react';
import { AppContext } from './AppContext';
import { graphql, useQuery, useMutation } from 'react-apollo';
import loginMutation from '../mutations/login';
import signupMutation from '../mutations/signup';
import newPostMutation from '../mutations/newPost';
import newCommentMutation from '../mutations/newComment';
import query from '../queries/user';
import recentPosts from '../queries/recentPosts';
import { MuiThemeProvider } from '@material-ui/core/styles';
import darkTheme from '../themes/dark-theme';
import theme from '../themes/theme';
import { Helmet } from 'react-helmet';
import colors from '../themes/colors';
const { grey, lightGrey, mintGreen } = colors;

export interface Props {
  resetStore: Function | null;
  clearStore: Function | null;
  children: ReactNode;
}

export interface Creds {
  email: string;
  password: string;
  username: string;
}

const AppProvider = (props: Props) => {
  let currentUser = null;
  let authorized = false;
  const userToken = null;
  const [darkMode, setDarkMode] = useState(true);

  const getUser = useQuery(query);
  const userLoading = getUser.loading;
  const recentPostsFound = useQuery(recentPosts);
  const [signup] = useMutation(signupMutation);
  const [login] = useMutation(loginMutation);
  const [newPost] = useMutation(newPostMutation);
  const [newComment] = useMutation(newCommentMutation);

  if (userLoading) {
    return null;
  }
  if (!userLoading && getUser.data) {
    currentUser = getUser.data.user;

    if (currentUser !== undefined && currentUser !== null) {
      if (currentUser.token !== null) {
        localStorage.setItem('token', currentUser.token);
        if (currentUser.expires !== null) {
          localStorage.setItem('expires', currentUser.expires);
        }
      } else {
        currentUser.token = localStorage.getItem('token');
      }
      authorized = true;
    }
  }

  const attemptSignup = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const newUser = await signup({
        variables: { email, password, username }
      });

      if (newUser && newUser.data !== undefined) {
        let tokens = null;
        try {
          tokens = JSON.parse(newUser.data.signup);
        } catch (err) {
          return newUser.data.signup;
        }

        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        const expires = tokens.expires;
        props.resetStore && props.resetStore();
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refToken);
        localStorage.setItem('expires', expires);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const attemptLogin = async (email: string, password: string) => {
    try {
      const user = await login({
        variables: { email, password }
      });

      if (user && user.data !== undefined) {
        let tokens = null;

        try {
          tokens = JSON.parse(user.data.login);
        } catch (err) {
          return user.data.login;
        }

        const token = tokens.jwt;
        const refToken = tokens.refreshToken;
        const expires = tokens.expires;

        props.resetStore && props.resetStore();
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refToken);
        localStorage.setItem('expires', expires);
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendNewPost = async (
    userId: string,
    title: string,
    content: string,
    username: string,
    token: string
  ) => {
    await newPost({
      variables: {
        postInput: {
          userId,
          title,
          content,
          username,
          token
        }
      }
    }).then(() => {
      recentPostsFound.refetch();
    });
  };

  const sendNewComment = async (
    userId: string,
    content: string,
    username: string,
    token: string,
    parentType: string,
    parentId: string
  ) => {
    return new Promise((resolve, reject) => {
      newComment({
        variables: {
          commentInput: {
            userId,
            content,
            username,
            token,
            parentType,
            parentId
          }
        }
      })
        .then(() => {
          resolve('Success');
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  const signOut = () => {
    props.resetStore && props.resetStore();
    localStorage.removeItem('token');
  };

  const bgColor = darkMode ? grey : lightGrey;

  const user = getUser.data ? getUser.data.user : null;

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme() : theme()}>
      <AppContext.Provider
        value={{
          auth: authorized,
          signin: attemptLogin,
          user,
          signOut: signOut,
          signup: attemptSignup,
          newPost: sendNewPost,
          setDarkMode,
          darkMode,
          newComment: sendNewComment
        }}
      >
        <Helmet>
          <style>{`body { background-color: ${bgColor};}`}</style>
        </Helmet>
        {props.children}
      </AppContext.Provider>
    </MuiThemeProvider>
  );
};

export default AppProvider;

// export default graphql(query)(graphql(mutation)(appProvider));
// export default compose(
//   // graphql(query, { name: 'getUser' }),
//   // graphql(recentPosts, { name: 'recentPosts' }),
//   graphql(signupMutation, { name: 'signup' }),
//   graphql(loginMutation, { name: 'login' }),
//   graphql(newPostMutation, { name: 'newPost' }),
//   graphql(newCommentMutation, { name: 'newComment' })
// )(AppProvider);
