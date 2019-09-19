require('@babel/polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../client/redux/make-store';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Client from './client';
import win from './utils/win';
import dom from './utils/dom';
import { loadableReady } from '@loadable/component';
import { createHttpLink } from 'apollo-link-http';
import { GRAPHQL_ENDPOINT } from '../client/config';

const apolloClient = new ApolloClient({
    cache: new InMemoryCache().restore(win.getValue('__APOLLO_STATE__')),
    link: createHttpLink({ uri: GRAPHQL_ENDPOINT }),
});
dom.removeChild('__APOLLO_STATE__');

loadableReady(() => {
    ReactDOM.hydrate(<Client store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
});
