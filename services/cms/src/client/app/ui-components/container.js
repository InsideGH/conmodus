import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Container = styled.div`
    text-align: ${props => props.align};
`;

Container.defaultProps = {
    align: 'left',
};

Container.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Container;
