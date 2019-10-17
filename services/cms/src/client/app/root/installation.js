import React from 'react';
import InitialSetup from '../initial-setup/initial-setup';
import { Route, Redirect, Switch } from 'react-router-dom';

const Installation = () => {
    return (
        <Switch>
            <Route exact path="/initial-setup">
                <InitialSetup />
            </Route>
            <Route>
                <Redirect to="/initial-setup" />
            </Route>
        </Switch>
    );
};

Installation.propTypes = {};

Installation.propTypes = {};

export default Installation;
