import React from 'react';
import axios from 'axios';

import { Context } from '../../../conmodus-provider';

class ExampleWather extends React.Component {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);

        let weather = 'loading...';
        const task = () => axios.get('http://localhost:4000/api/weather');
        const res = this.context.task.axios(task, 'weather', res => {
            this.setState({
                weather: res.data,
            });
        });
        if (res) {
            weather = res.data;
        }

        this.state = {
            weather,
        };
    }

    render() {
        return (
            <>
                <h3>Weather fetched from /api</h3>
                <h5>{this.state.weather}</h5>
            </>
        );
    }
}

export default ExampleWather;
