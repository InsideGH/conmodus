import React from 'react';
import PropTypes from 'prop-types';

const ExampleDynamic = ({ match }) => {
    const { name } = match.params;
    return (
        <>
            <h3>Dynamic name={name}</h3>
        </>
    );
};

ExampleDynamic.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ExampleDynamic;
