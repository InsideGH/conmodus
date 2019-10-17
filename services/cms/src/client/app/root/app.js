import React from 'react';
import INSTALLATION from '../../apollo/queries/installation';
import Installed from './installed';
import Installation from './installation';
import useQueryMsg from '../util/useQueryMsg';

const App = () => {
    const { loading, error, data } = useQueryMsg(INSTALLATION)();

    if (loading || error) {
        return null;
    }

    const { installation } = data;

    return installation.state == 'FINISHED' ? <Installed /> : <Installation />;
};

App.propTypes = {};

App.propTypes = {};

export default App;
