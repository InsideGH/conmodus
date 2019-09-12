require('@babel/polyfill');
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import makeStore from '../client/redux/make-store';
import ApolloClient from 'apollo-client';
import Client from './client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { GRAPHQL_ENDPOINT } from '../client/config';

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: GRAPHQL_ENDPOINT }),
});

const store = makeStore();
const HotDev = hot(Client);

ReactDOM.render(<HotDev store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
