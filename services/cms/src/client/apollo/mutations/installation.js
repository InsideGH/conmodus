import gql from 'graphql-tag';

const INSTALLATION_FINISHED = gql`
    mutation InstallationFinished($state: InstallationState!) {
        installation(state: $state) {
            id
            state
        }
    }
`;

export default INSTALLATION_FINISHED;
