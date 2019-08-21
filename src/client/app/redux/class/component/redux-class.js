import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../../conmodus-provider';
import ExampleReduxClassLevel2 from '../container/redux-class-level2';

class ExampleReduxClass extends React.PureComponent {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        props.fetchQuote(this.context);
    }

    getQuote = () => {
        const { quote, loading } = this.props;
        if (quote) {
            return quote;
        }
        return loading ? 'Loading quote...' : null;
    };

    render() {
        const { count, decrease } = this.props;
        const quote = this.getQuote();

        let level2 = null;
        if (quote == "It's a miracle") {
            level2 = <ExampleReduxClassLevel2/>;
        }

        return (
            <>
                <h3>Count: {count}</h3>
                <button onClick={() => decrease(1)}>Decrease</button>
                <h3>{quote}</h3>
                {level2}
            </>
        );
    }
}

ExampleReduxClass.propTypes = {
    count: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    fetchQuote: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    quote: PropTypes.any,
};

export default ExampleReduxClass;
