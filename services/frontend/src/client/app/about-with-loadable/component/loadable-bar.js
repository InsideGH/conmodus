import React from 'react';
import loadable from '@loadable/component';
import './loadable-bar.css';

const LoadableFoo = loadable(() => import('./loadable-foo'), {
    fallback: <div style={{backgroundColor: 'red', width: '400px', height: '800px'}}>Loading foo...</div>,
});

const Bar = () => {
    return (
        <>
            <h3 className="knut">This is bar.</h3>
            <LoadableFoo />
        </>
    );
};

export default Bar;
