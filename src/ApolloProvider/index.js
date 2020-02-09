import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import App from '../App';

const link = createHttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
