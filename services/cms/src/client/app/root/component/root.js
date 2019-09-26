import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import LoadableFallback from '../../../util/loadable-fallback';
import loadable from '@loadable/component';
import { VERSION } from '../../../config';

const App = () => {
    return (
        <>
            <h5>CMS builder version {VERSION}</h5>
        </>
    );
};

App.propTypes = {};

export default App;
