import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 0.5rem;
    font-size: 16px;
    ::placeholder {
        color: ${p => p.theme.colors.secondaryTextColor};
        opacity: 1;
    }
    background-color: ${p => p.theme.colors.contentBgColor};
    border-radius: ${p => p.theme.border.radius};
    border: ${p => p.theme.border.default};
`;

Input.propTypes = {};

export default withTheme(Input);
