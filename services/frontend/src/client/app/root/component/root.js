import React from 'react';
import Footer from '../../footer/component/footer';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import GlobalStyle from '../../styled/global-style';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <GlobalStyle />
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...</h1>
                <h1>Not much here...last</h1>
                <Footer />
            </React.Fragment>
        </ThemeProvider>
    );
};

App.propTypes = {};

export default App;
