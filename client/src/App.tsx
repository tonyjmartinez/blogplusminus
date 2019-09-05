import React from 'react';
import AppProvider from './context/AppProvider';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({
  uri: 'http://localhost:3090/graphql/'
  // uri: 'https://blogplusminus.com/graphql/'
});

const cache = new InMemoryCache({ dataIdFromObject: obj => obj.id });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  let refreshToken = null;
  const now = new Date();

  let expires: string | null = localStorage.getItem('expires');

  if (expires && now > new Date(expires)) {
    refreshToken = localStorage.getItem('refreshToken');
  } else {
    console.log('not expired');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      authrefresh: refreshToken ? refreshToken : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppProvider
        resetStore={client.resetStore}
        clearStore={client.clearStore}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  );
};

export default App;
