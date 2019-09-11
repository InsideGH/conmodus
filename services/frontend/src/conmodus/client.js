import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/app/root/component/root';
import { Provider as ConmodusProvider } from '../client/conmodus-provider';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';

const Client = ({ store, apolloClient }) => (
    <ApolloProvider client={apolloClient}>
        <ConmodusProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ConmodusProvider>
    </ApolloProvider>
);

Client.propTypes = {
    store: PropTypes.any.isRequired,
    apolloClient: PropTypes.any.isRequired,
};

export default Client;
