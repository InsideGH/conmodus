import { keyframes } from 'styled-components';

export const moveY = (from, to) => keyframes`
    from {
        transform: translateY(${from}px);
    }

    to {
        transform: translateY(${to}px);
    }
`;

export const fade = (from, to) => keyframes`
    from {
        opacity: ${from};
    }

    to {
        opacity: ${to};
    }
`;
