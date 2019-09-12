import React from 'react';

import { Context } from '../../../conmodus-provider';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withApolloClient from '../../../apollo/with-apollo-client';

import PropTypes from 'prop-types';

function WeatherHooks() {
    const { loading, error, data } = useQuery(gql`
        {
            weather {
                id
                summary
                date
            }
        }
    `);

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h3>Weather fetched from /graphql provider (hook)</h3>
            <h5>{`Summary: ${data.weather.summary}`}</h5>
            <h5>{`Date: ${data.weather.date}`}</h5>
        </div>
    );
}

class WeatherClass extends React.Component {
    static contextType = Context;

    constructor(props, context) {
        super(props, context);
        this.context.ssrData.register(
            `weather-graphql`,
            () =>
                new Promise(async resolve => {
                    const res = await this.props.client.query({
                        query: gql`
                            {
                                weather {
                                    id
                                    summary
                                    date
                                }
                            }
                        `,
                    });
                    resolve(res.data.weather);
                })
        );
    }

    render() {
        const { summary, date } = this.context.ssrData.store['weather-graphql'] || {};
        return (
            <div>
                <h3>Weather fetched from /graphql client (class)</h3>
                <h5>{summary}</h5>
                <h5>{date}</h5>
            </div>
        );
    }

    static propTypes = {
        client: PropTypes.any.isRequired,
    };
}

const WeatherClassWithClient = withApolloClient(WeatherClass);

class ExampleWeatherGraphql extends React.Component {
    render() {
        return (
            <>
                <WeatherClassWithClient />
                <WeatherHooks />
            </>
        );
    }
}

export default ExampleWeatherGraphql;
