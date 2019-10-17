import React from 'react';
import AppMessageProvider from '../providers/snack-bar/snack-bar';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import Layout from '../ui-components/layout';
import App from './app';
import { theme } from '../providers/theme/theme';
import { BrowserRouter} from 'react-router-dom';

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <Global
                styles={css`
                    body {
                        margin: 0;
                        background-color: ${theme.colors.bodyBgColor};
                    }
                    * {
                        color: ${theme.colors.primaryTextColor};
                        font-family: sans-serif;
                        :focus {
                            outline: none;
                        }
                    }
                `}
            />
            <BrowserRouter>
                <AppMessageProvider>
                    <Layout>
                        <App />
                    </Layout>
                </AppMessageProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

Root.propTypes = {};

export default Root;
