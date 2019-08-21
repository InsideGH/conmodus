import React from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../../conmodus-provider';

class Delayed extends React.Component {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        const { delay, id } = props;

        this.context.ssrData.register(
            id,
            () =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve(true);
                    }, delay);
                })
        );
    }

    render() {
        const { children, id } = this.props;
        const done = this.context.ssrData.store[id] || false;
        return done ? children : null;
    }

    static propTypes = {
        delay: PropTypes.number.isRequired,
        children: PropTypes.any.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
}

class ExampleDeep extends React.PureComponent {
    render() {
        return (
            <>
                <h3>Level0 - render @ time 0</h3>
                <Delayed delay={100} id="level1">
                    <h3>Level1 - render by parent @ time 0 + 100 ms</h3>
                    <Delayed delay={100} id="level2">
                        <h3>Level2 - render by parent @ time 0 + 200 ms</h3>
                        <Delayed delay={100} id="level3">
                            <h3>Level3 - render by parent @ time 0 + 300 ms</h3>
                        </Delayed>
                    </Delayed>
                </Delayed>
            </>
        );
    }
}
export default ExampleDeep;
