import React from 'react';
import { ApolloConsumer } from '@apollo/react-common';

const withApolloClient = Component => {
    const Wrapped = props => {
        return <ApolloConsumer>{client => <Component {...props} client={client} />}</ApolloConsumer>;
    };
    return Wrapped;
};

export default withApolloClient;
