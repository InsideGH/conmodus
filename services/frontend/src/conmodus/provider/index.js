import React from 'react';
import ConmodusProvider from './provider';
import PropTypes from 'prop-types';

const initialProviderEntries = { thunks: [], ssrDataList: [] };

const createProvider = Context => {
    const Provider = ({ children, entries = initialProviderEntries }) => (
        <ConmodusProvider Context={Context} entries={entries}>
            {children}
        </ConmodusProvider>
    );

    Provider.propTypes = {
        children: PropTypes.any.isRequired,
        entries: PropTypes.shape({
            thunks: PropTypes.array.isRequired,
            ssrDataList: PropTypes.array.isRequired,
        }),
    };
    return Provider;
};

const createWithProvider = Context => {
    const withProvider = (entries = initialProviderEntries) => App =>
        function ConmodusWrapper(props) {
            return (
                <ConmodusProvider Context={Context} entries={entries}>
                    <App {...props} />
                </ConmodusProvider>
            );
        };
    return withProvider;
};

const create = () => {
    const Context = React.createContext();

    const Provider = createProvider(Context);
    const withProvider = createWithProvider(Context);

    return {
        withProvider,
        Provider,
        Context,
    };
};

export default {
    create,
};
