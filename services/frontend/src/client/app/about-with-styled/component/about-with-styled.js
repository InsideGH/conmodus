import React from 'react';
import styled from 'styled-components';
import Container from './my-other';

const Header = styled.h3`
    background-color: pink;
    padding: 1rem;
    margin: 1rem;
    :hover {
        color: white;
    }
`;

const Title = styled.h2`
    padding: 1rem;
    margin: 1rem;
    background-color: grey;
`;

const ExampleAboutWithStyled = () => {
    return (
        <Container>
            <Title>Styled components</Title>
            <Header>About with styled</Header>
        </Container>
    );
};

export default ExampleAboutWithStyled;
