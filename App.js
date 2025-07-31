import React from 'react';
import Main from './src/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/apolloClient';

const client = createApolloClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
