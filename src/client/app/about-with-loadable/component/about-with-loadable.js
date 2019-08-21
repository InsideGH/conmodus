import React from 'react';
import loadable from '@loadable/component';

const LoadableBar = loadable(() => import('./loadable-bar'), {
    fallback: <div style={{backgroundColor: 'green', width: '400px', height: '800px'}}>Loading bar...</div>,
});

const ExampleAbout = () => {
    return (
        <>
            <h3>About with loadable</h3>
            <LoadableBar />
        </>
    );
};

export default ExampleAbout;
