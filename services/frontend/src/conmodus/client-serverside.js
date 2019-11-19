import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChunkExtractorManager } from '@loadable/server';
import App from '../client/app/root/component/root';
import { Provider as ConmodusProvider } from '../client/conmodus-provider';
import { ApolloProvider } from '@apollo/react-common';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ClientServerSide = ({ url, context, store, entries, sheet, extractor, apolloClient, helmetContext }) => {
    return (
        <HelmetProvider context={helmetContext}>
            <ApolloProvider client={apolloClient}>
                <ChunkExtractorManager extractor={extractor}>
                    <ConmodusProvider entries={entries}>
                        <StaticRouter location={url} context={context}>
                            <Provider store={store}>
                                <App />
                            </Provider>
                        </StaticRouter>
                    </ConmodusProvider>
                </ChunkExtractorManager>
            </ApolloProvider>
        </HelmetProvider>
    );
};

ClientServerSide.propTypes = {
    url: PropTypes.string.isRequired,
    context: PropTypes.object.isRequired,
    store: PropTypes.any.isRequired,
    apolloClient: PropTypes.any.isRequired,
    entries: PropTypes.shape({
        ssrDataList: PropTypes.array.isRequired,
        thunks: PropTypes.array.isRequired,
    }).isRequired,
    sheet: PropTypes.any.isRequired,
    extractor: PropTypes.any.isRequired,
    helmetContext: PropTypes.any.isRequired,
};

export default ClientServerSide;
