require('@babel/polyfill');
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import makeStore from '../client/redux/make-store';
import Client from './client';

const store = makeStore();
const HotDev = hot(Client);

ReactDOM.render(<HotDev store={store}/>, document.getElementById('react-root'));
