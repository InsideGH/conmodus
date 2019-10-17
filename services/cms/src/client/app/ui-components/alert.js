import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const Alert = styled.p`
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: ${p => p.theme.border.radius};
    background-color: ${p => (p.error ? p.theme.colors.errorBgColor : p.theme.colors.successBgColor)};
    padding: 0.5rem;
`;

Alert.propTypes = {
    error: PropTypes.bool,
};

export default withTheme(Alert);
