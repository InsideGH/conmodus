import React from 'react';
import axios from 'axios';

import { Context } from '../../../conmodus-provider';
import {API_GATEWAY} from '../../../api-config';

class ExampleWeather extends React.Component {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        this.context.ssrData.register(
            `weather`,
            () =>
                new Promise(async resolve => {
                    const res = await axios.get(`${API_GATEWAY}/weather`);
                    resolve(res.data);
                })
        );
    }

    render() {
        return (
            <>
                <h3>Weather fetched from /api</h3>
                <h5>{this.context.ssrData.store['weather']}</h5>
            </>
        );
    }
}

export default ExampleWeather;
