require('@babel/polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../client/redux/make-store';
import Client from './client';
import { loadableReady } from '@loadable/component';
import apolloClient from '../client/apollo/create-client';

loadableReady(() => {
    ReactDOM.hydrate(<Client store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
});
