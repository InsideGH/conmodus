import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        background-color: ${p => p.theme.body.bgColor};
        padding-bottom: ${p => p.theme.body.paddingBottom[0]}px;
        @media (min-width: 1200px) {
            padding-bottom: ${p => p.theme.body.paddingBottom[1]}px;
        }    
    }
    span, h1, h2, h3, h4, h5, h6 {
        font-family: ${p => p.theme.font.fontFamily};
        color: ${p => p.theme.font.color};
    }
`;

export default GlobalStyle;
