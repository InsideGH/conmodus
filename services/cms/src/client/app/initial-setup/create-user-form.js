import React, { useState, useContext } from 'react';
import Input from '../ui-components/input';
import Label from '../ui-components/label';
import Divider from '../ui-components/divider';
import Button from '../ui-components/button';
import Form from '../ui-components/form';
import { Context } from '../providers/snack-bar/snack-bar';
import PropTypes from 'prop-types';

const CreateUserForm = ({ onCreate }) => {
    const message = useContext(Context);
    const [emailOK, setEmailOk] = useState(true);
    const [passwordOK, setPasswordOk] = useState(true);
    const [email, setEmail] = useState('peter.larsson@24hr.se');
    const [password, setPassword] = useState('1');

    const onSubmit = e => {
        if (!emailOK) {
            message.error({ message: 'You must provide an email', delay: 0 });
            e.preventDefault();
            return;
        }
        if (!passwordOK) {
            message.error({ message: 'You must provide a password', delay: 0 });
            e.preventDefault();
            return;
        }
        e.preventDefault();

        onCreate({
            email,
            password,
        });
    };

    const onInput = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                {
                    setEmail(value);
                    setEmailOk(value.length > 0);
                }
                break;
            case 'password':
                {
                    setPassword(value);
                    setPasswordOk(value.length > 0);
                }
                break;
            default:
                break;
        }
    };
    return (
        <Form>
            <Label htmlFor="name">Email</Label>
            <Input type="email" name="email" value={email} onChange={onInput} />
            <Divider invisible />
            <Label htmlFor="name">Password</Label>
            <Input type="password" name="password" value={password} onChange={onInput} />
            <Divider invisible />
            <Button type="submit" onClick={onSubmit}>
                Create
            </Button>
        </Form>
    );
};

CreateUserForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
};

export default CreateUserForm;
