import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';

const Segment = styled.div`
    border: ${p => p.theme.border.default};
    border-radius: ${p => p.theme.border.radius};
    background-color: ${p => p.theme.colors.contentBgColor};
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.2);
    padding: 1rem;
`;

Segment.propTypes = {};

export default withTheme(Segment);
