import React from 'react';
import { Context } from '../../../conmodus-provider';

class Foo extends React.PureComponent {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);

        this.context.ssrData.register(
            'animal',
            () =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('Shark');
                    }, 25);
                })
        );
    }
    render() {
        const animal = this.context.ssrData.store['animal'] || 'loading animal...';
        return (
            <>
                <h3>This is foo.</h3>
                <h4>Animal: {animal}</h4>
            </>
        );
    }
}

export default Foo;
