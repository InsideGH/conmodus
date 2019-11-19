import React from 'react';
import styled from '@emotion/styled';
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
            <Title>Emotion Styled components</Title>
            <Header>About with emotion styled</Header>
        </Container>
    );
};

export default ExampleAboutWithStyled;
