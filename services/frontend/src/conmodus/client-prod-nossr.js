require('@babel/polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../client/redux/make-store';
import Client from './client';
import dom from './utils/dom';
import apolloClient from '../client/apollo/create-client';

dom.removeChild('loading-container');
ReactDOM.render(<Client store={store} apolloClient={apolloClient} />, document.getElementById('react-root'));
