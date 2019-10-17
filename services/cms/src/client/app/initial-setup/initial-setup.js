import React, { useState } from 'react';
import { VERSION } from '../../config';
import Header from '../ui-components/header';
import styled from '@emotion/styled';
import Segment from '../ui-components/segment';
import Paragraph from '../ui-components/paragraph';
import Alert from '../ui-components/alert';
import Button from '../ui-components/button';
import CreateUserForm from './create-user-form';
import CREATE_USER from '../../apollo/mutations/create-user';
import UPDATE_INSTALLATION from '../../apollo/mutations/installation';
import useMutationMsg from '../util/useMutationMsg';

const Placer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const Content = styled(Segment)`
    width: 100%;
    max-width: 600px;
`;

const InitialSetup = () => {
    const [success, setSuccess] = useState(false);

    const [createUser] = useMutationMsg(CREATE_USER)({
        loading: 'Creating user',
        error: "Couldn't create user",
    });
    const [finishInstall] = useMutationMsg(UPDATE_INSTALLATION)({
        loading: 'Please wait, finishing installation',
        error: "Couldn't finish installation",
    });

    const onCreateUser = async user => {
        await createUser({ variables: { input: user } });
        setSuccess(true);
    };

    const onFinish = () => {
        finishInstall({ variables: { state: 'FINISHED' } });
    };

    return (
        <Placer>
            <Content>
                <Header as="h3" dividing>
                    Welcome to CMS {VERSION}
                    <Header.SubHeader>Initial setup</Header.SubHeader>
                </Header>

                {success ? (
                    <>
                        <Alert>Successfully created user.</Alert>
                        <Button onClick={onFinish}>Finish installation</Button>
                    </>
                ) : (
                    <>
                        <Paragraph>Create a user.</Paragraph>
                        <CreateUserForm onCreate={onCreateUser} />
                    </>
                )}
            </Content>
        </Placer>
    );
};

InitialSetup.propTypes = {};

export default InitialSetup;
