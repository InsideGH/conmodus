require('@babel/polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import makeStore from '../client/redux/make-store';
import ApolloClient from 'apollo-client';
import Client from './client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { GRAPHQL_ENDPOINT } from '../client/config';
import dom from './utils/dom';

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: GRAPHQL_ENDPOINT }),
});

const store = makeStore();

dom.removeChild('loading-container');
ReactDOM.render(<Client store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
