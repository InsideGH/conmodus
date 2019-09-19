import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { GRAPHQL_ENDPOINT } from '../config';
import win from '../../conmodus/utils/win';
import dom from '../../conmodus/utils/dom';

const cacheValue = win.getValue('__APOLLO_STATE__');
const apolloClient = new ApolloClient({
    cache: cacheValue ? new InMemoryCache().restore(cacheValue) : new InMemoryCache(),
    link: createHttpLink({ uri: GRAPHQL_ENDPOINT }),
});
dom.removeChild('__APOLLO_STATE__');

export default apolloClient;
