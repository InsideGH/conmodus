import React from 'react';
import axios from 'axios';

import { Context } from '../../../conmodus-provider';

class ExampleDynamic extends React.Component {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        this.context.ssrData.register(
            `dogs`,
            () =>
                new Promise(async resolve => {
                    const dogs = [];
                    for (let index = 0; index < 10; index++) {
                        const res = await axios.get('https://dog.ceo/api/breeds/image/random?' + index);
                        dogs.push(res.data.message);
                    }
                    resolve(dogs);
                })
        );

        this.context.ssrData.register(
            'cat',
            () =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('jerry');
                    }, 0);
                })
        );
    }

    render() {
        const cat = this.context.ssrData.store['cat'] || 'loading cat';
        const dogs = this.context.ssrData.store['dogs'] || [];
        return (
            <>
                <h3>Fetch SSR and Clientside</h3>
                <h5>Cat: {cat}</h5>
                <h5>Dog images: </h5>
                {dogs.map((dog, index) => (
                    <img key={index} src={dog} style={{ width: '200px' }} />
                ))}
            </>
        );
    }
}

export default ExampleDynamic;
