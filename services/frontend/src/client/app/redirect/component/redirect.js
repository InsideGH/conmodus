import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { Context } from '../../../conmodus-provider';

const ExampleRedirect = () => {
    const context = useContext(Context);
    const [once, setOnce] = useState(true);
    const [redirect, setRedirect] = useState(false);

    if (once) {
        setOnce(false);

        context.ssrData.register(
            'redirect',
            () =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve(true);
                    }, 100);
                })
        );
    }

    const shouldRedirect = context.ssrData.store['redirect'] || false;

    if (!redirect && shouldRedirect) {
        setRedirect(shouldRedirect);
    }

    return (
        <>
            <h3>Redirect page</h3>
            {redirect ? <Redirect to="/deep" /> : 'waiting for redirect...'}
        </>
    );
};

export default ExampleRedirect;
