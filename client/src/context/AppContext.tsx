import React from 'react';

export interface AppCtxInterface {
  auth: boolean;
  signin: Function;
  user: Object;
  signOut: Function;
  signup: Function;
  newPost: Function;
  setDarkMode: Function;
  darkMode: boolean;
  newComment: Function;
}
const initialState = {
  auth: false,
  signin: function() {},
  user: {},
  signOut: function() {},
  signup: function() {},
  newPost: function() {},
  setDarkMode: function() {},
  darkMode: true,
  newComment: function() {}
};

interface IContext {
  auth: boolean;
  signin: Function;
  user: Object;
  signOut: Function;
  signup: Function;
  newPost: Function;
  setDarkMode: Function;
  darkMode: boolean;
  newComment: Function;
}

// const appContext = React.createContext("app");
export const AppContext = React.createContext({} as IContext);
