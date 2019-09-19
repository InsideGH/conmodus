require('@babel/polyfill');
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../client/redux/make-store';
import Client from './client';
import { loadableReady } from '@loadable/component';
import apolloClient from '../client/apollo/create-client';

const HotDev = hot(Client);

loadableReady(() => {
    ReactDOM.render(<HotDev store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
});
