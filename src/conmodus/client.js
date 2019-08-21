import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/app/root/component/root';
import { Provider as ConmodusProvider } from '../client/conmodus-provider';
import PropTypes from 'prop-types';

const Client = ({ store }) => (
    <ConmodusProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ConmodusProvider>
);

Client.propTypes = {
    store: PropTypes.any.isRequired,
};

export default Client;
