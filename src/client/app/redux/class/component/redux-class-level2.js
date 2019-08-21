import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../../conmodus-provider';

class ExampleReduxClassLevel2 extends React.PureComponent {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        props.fetchQuote2(this.context);
    }

    getQuote = () => {
        const { quote2, loading } = this.props;
        if (quote2) {
            return quote2;
        }
        return loading ? 'Loading quote2...' : null;
    };

    render() {
        const { count, decrease } = this.props;

        return (
            <>
                <h3>Count: {count}</h3>
                <button onClick={() => decrease(1)}>Decrease</button>
                <h3>{this.getQuote()}</h3>
            </>
        );
    }
}

ExampleReduxClassLevel2.propTypes = {
    count: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    fetchQuote2: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    quote2: PropTypes.any,
};

export default ExampleReduxClassLevel2;
