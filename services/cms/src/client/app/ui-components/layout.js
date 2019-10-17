import styled from '@emotion/styled';

const Layout = styled.div`
    padding: 0 15rem;
    @media (max-width: 1600px) {
        padding: 0 9rem;
    }
    @media (max-width: 1200px) {
        padding: 0 7rem;
    }
    @media (max-width: 1000px) {
        padding: 0 5rem;
    }
    @media (max-width: 667px) {
        padding: 0 2rem;
    }
    @media (max-width: 414px) {
        padding: 0 0.5rem;
    }
`;

Layout.propTypes = {};

export default Layout;
