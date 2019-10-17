import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/app/root/root';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';

const Client = ({ store, apolloClient }) => (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
);

Client.propTypes = {
    store: PropTypes.any.isRequired,
    apolloClient: PropTypes.any.isRequired,
};

export default Client;
