import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            email
        }
    }
`;

export default CREATE_USER;
