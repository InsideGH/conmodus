import React from 'react';
import Login from '../login/login';
import { Route, Redirect, Switch } from 'react-router-dom';

const Installed = () => {
    return (
        <Switch>
            <Route exact path="/">
                <h1>main page</h1>
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route>
                <Redirect to="/login" />
            </Route>
        </Switch>
    );
};

Installed.propTypes = {};

Installed.propTypes = {};

export default Installed;
