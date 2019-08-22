import React from 'react';
import { Context } from '../../../conmodus-provider';

class ExampleSSRData extends React.PureComponent {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);

        this.context.ssrData.register(
            'myid',
            () =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            name: `async value`,
                        });
                    }, 20);
                })
        );
    }

    onClick = () => {
        this.context.ssrData.update('myid', {
            name: `client value: ${new Date().getTime()}`,
        });
    };

    render() {
        const data = this.context.ssrData.store['myid'] || {
            name: 'initial value',
        };

        return (
            <>
                <h3>Conmodus context</h3>
                <h4>Name: {data.name}</h4>
                <button onClick={this.onClick}>PRESS</button>
            </>
        );
    }
}

export default ExampleSSRData;
