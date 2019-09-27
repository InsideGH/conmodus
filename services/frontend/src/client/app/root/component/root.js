import React from 'react';
import Footer from '../../footer/component/footer';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import GlobalStyle from '../../styled/global-style';

const App = () => {
    let content = [];
    let i;
    for (i = 0; i < 40; i++) {
        content.push(<h1 key={i}>Not much here...</h1>);
    }
    content.push(<h1 key={i}>Not much here...last</h1>);

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <GlobalStyle />
                {content}
                <Footer />
            </React.Fragment>
        </ThemeProvider>
    );
};

App.propTypes = {};

export default App;
