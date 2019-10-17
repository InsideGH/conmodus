import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: black;
    color: white;
    padding: 10rem;
`;

const LoadableFallback = () => {
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    );
};

export default LoadableFallback;
