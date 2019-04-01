import React, { Component } from "react";
import AppProvider from "./context/appProvider";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./themes/theme";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";

const link = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin"
});

const cache = new InMemoryCache({ dataIdFromObject: obj => obj.id });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache
});

const App = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AppProvider>
      </ApolloProvider>
    </MuiThemeProvider>
  );
};

export default App;
