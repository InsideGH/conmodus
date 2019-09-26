import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import PropTypes from 'prop-types';

function WeatherHooksA() {
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

    /**
     * Apollo server side rendering will cache both of these queries.
     * If the NameHooksB component isn't rendered, it's not queried though.
     */
    return (
        <div>
            <h3>A</h3>
            <h5>{`Summary: ${data.weather.summary}`}</h5>
            <h5>{`Date: ${data.weather.date}`}</h5>
            {data.weather.summary == 'Sunny and warm with graphql!' ? <NameHooksB summary={data.weather.summary} /> : null}
        </div>
    );
}

function NameHooksB({ summary }) {
    const { loading, error, data } = useQuery(
        gql`
            query Name($breed: String!) {
                name(breed: $breed) {
                    id
                    firstName
                    lastName
                }
            }
        `,
        {
            variables: { breed: summary },
        }
    );

    if (loading) return <p>Loading name...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h3>B</h3>
            <h5>{`firstName: ${data.name.firstName}`}</h5>
            <h5>{`Date: ${data.name.lastName}`}</h5>
        </div>
    );
}

NameHooksB.propTypes = {
    summary: PropTypes.string.isRequired,
};

class ExampleWeatherGraphql extends React.Component {
    render() {
        return (
            <>
                <WeatherHooksA />
            </>
        );
    }
}

export default ExampleWeatherGraphql;
