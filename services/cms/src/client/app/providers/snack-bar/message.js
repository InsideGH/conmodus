import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import { withTheme } from 'emotion-theming';

const animations = {
    enter: keyframes({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    }),
    exit: keyframes({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        },
    }),
};

const Message = ({ children, type, animationName, enterDuration, exitDuration, theme: { colors } }) => {
    const bgColor = type == 'info' ? colors.infoBgColor : colors.errorBgColor;
    const animation = animations[animationName];
    const duration = animationName == 'enter' ? enterDuration : exitDuration;
    return (
        <div
            css={css`
                background-color: ${bgColor};
                color: white;
                position: fixed;
                top: 0;
                width: 100%;
                padding: 0.5rem;
                text-align: center;
                animation-name: ${animation};
                animation-duration: ${duration}ms;
                animation-fill-mode: forwards;
            `}
        >
            {children}
        </div>
    );
};

Message.defaultProps = {};

Message.propTypes = {
    children: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['info', 'error']).isRequired,
    animationName: PropTypes.oneOf(['enter', 'exit']),
    enterDuration: PropTypes.number.isRequired,
    exitDuration: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        colors: PropTypes.shape({
            infoBgColor: PropTypes.string.isRequired,
            errorBgColor: PropTypes.string.isRequired,
        }),
    }),
};

export default withTheme(Message);
