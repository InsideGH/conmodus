import gql from 'graphql-tag';

const INSTALLATION = gql`
    {
        installation {
            id
            state
        }
    }
`;

export default INSTALLATION;
