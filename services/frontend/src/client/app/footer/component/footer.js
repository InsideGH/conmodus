import React from 'react';
import styled, { withTheme } from 'styled-components';
import { VERSION } from '../../../config';
import PropTypes from 'prop-types';
import { moveY, fade } from '../../styled/keyframes';

const Bottom = styled.div`
    position: fixed;
    width: 100%;

    bottom: ${p => -p.height1}px;
    height: ${p => p.height1}px;
    animation: ${p => moveY(0, -p.height1)} ${p => p.duration.moveUp}s ease-in-out forwards;

    @media (min-width: 1200px) {
        bottom: -${p => p.height2}px;
        height: ${p => p.height2}px;
        animation: ${p => moveY(0, -p.height2)} ${p => p.duration.moveUp}s ease-in-out forwards;
    }
`;

const LineShadow = styled.div`
    position: absolute;
    width: 100%;
    height: ${p => p.height1}px;
    filter: drop-shadow(0px -10px 15px rgba(50, 146, 18, 0.5));
    @media (min-width: 1200px) {
        height: ${p => p.height2}px;
    }
`;

const Line = styled.div`
    height: ${p => p.height1}px;
    background-color: ${p => p.lineColor};
    opacity: 0;
    clip-path: polygon(0 0, 100% 25%, 100% 30%, 0 5%);
    animation: ${fade(0, 1)} ${p => p.duration.fadeLine}s ease-in-out ${p => p.duration.delay}s forwards;
    @media (min-width: 1200px) {
        height: ${p => p.height2}px;
    }
`;

const Content = styled.div`
    height: ${p => p.height1}px;
    background-color: ${p => p.bgColor};
    clip-path: polygon(0 5%, 100% 30%, 100% 100%, 0 100%);
    @media (min-width: 1200px) {
        height: ${p => p.height2}px;
    }
`;

const Version = styled.div`
    position: absolute;
    right: 3px;
    bottom: 0;
`;

const Footer = ({ theme: { footer } }) => {
    return (
        <Bottom {...footer}>
            <LineShadow {...footer}>
                <Line {...footer} />
            </LineShadow>
            <Content {...footer}>
                <Version>
                    <span>{VERSION}</span>
                </Version>
            </Content>
        </Bottom>
    );
};

Footer.propTypes = {
    theme: PropTypes.shape({
        footer: PropTypes.shape({}),
    }),
};

export default withTheme(Footer);
