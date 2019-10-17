import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const headers = tags.reduce((acc, tag) => {
    acc[tag] = styled[tag]`
        :first-of-type {
            margin-top: 0;
        }
        border-bottom: ${p => (p.dividing ? p.theme.border.default : 'none')};
        padding-bottom: 0.5rem;
    `;
    return acc;
}, {});

const Header = ({ as, children, ...rest }) => React.createElement(headers[as], rest, children);

Header.propTypes = {
    as: PropTypes.oneOf(tags).isRequired,
    children: PropTypes.any,
};

const SubHeader = styled.div`
    color: ${p => p.theme.colors.secondaryTextColor};
    padding-top: 0.5rem;
    h1 > & {
        font-size: 20px;
    }
    h2 > & {
        font-size: 20px;
    }
    h3 > & {
        font-size: 16px;
    }
    h4 > & {
        font-size: 16px;
    }
    h5 > & {
        font-size: 14px;
    }
    h6 > & {
        font-size: 14px;
    }
`;

Header.SubHeader = withTheme(SubHeader);

export default withTheme(Header);
