import React from 'react';
import { Helmet } from 'react-helmet-async';

const ExampleAbout = () => {
    return (
        <>
            <Helmet>
                <html lang='dk' />
                <meta name='description' content='TEST REACT HELMET' />
                <meta name='keywords' content='AAA, BBB, CCC' />
                <title>About with helmet</title>
            </Helmet>
            <h3>About</h3>
        </>
    );
};

export default ExampleAbout;
