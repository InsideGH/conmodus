import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Divider = styled.div`
    margin: 1rem 0;
    border-bottom: ${p => p.theme.border.default};
    height: 0;
    visibility: ${props => (props.invisible ? 'hidden' : 'visible')};
`;

Divider.defaultProps = {
    invisible: false,
};

Divider.propTypes = {
    children: PropTypes.any,
    invisible: PropTypes.bool,
};

export default withTheme(Divider);
