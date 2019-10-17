import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Button = styled.button`
    border: 1px solid rgba(0, 0, 0, 0);
    font-size: 16px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    :hover {
        background-color: ${p => p.theme.colors.primaryBgColorHover};
    }
    background-color: ${p => p.theme.colors.primaryBgColor};
    border-radius: ${p => p.theme.border.radius};
`;

Button.propTypes = {};

export default withTheme(Button);
