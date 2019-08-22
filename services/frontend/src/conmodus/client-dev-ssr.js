require('@babel/polyfill');
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import makeStore from '../client/redux/make-store';
import Client from './client';
import win from './utils/win';
import dom from './utils/dom';
import { loadableReady } from '@loadable/component';

const store = makeStore(win.getValue('__CONMODUS_REDUX_DATA'));
dom.removeChild('__CONMODUS_REDUX_DATA');

const HotDev = hot(Client);

loadableReady(() => {
    ReactDOM.render(<HotDev store={store}/>, document.getElementById('react-root'));
});
