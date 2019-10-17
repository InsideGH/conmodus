import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const Grid = ({ children, cols, gap, justifyItems, alignItems, templateRows }) => {
    return (
        <div
            css={css`
                display: grid;
                width: 100%;
                grid-template-columns: repeat(${cols}, 1fr [col-start]);
                grid-template-rows: ${templateRows};
                grid-column-gap: ${gap.col};
                grid-row-gap: ${gap.row};
                justify-items: ${justifyItems};
                align-items: ${alignItems};
            `}
        >
            {children}
        </div>
    );
};

Grid.defaultProps = {
    cols: 12,
    templateRows: '200px 200px',
    gap: {
        col: '0px',
        row: '0px',
    },
    justifyItem: 'start',
    alignItems: 'stretch',
};

Grid.propTypes = {
    children: PropTypes.any,
    cols: PropTypes.number,
    templateRows: PropTypes.string,
    gap: PropTypes.shape({
        col: PropTypes.string.isRequired,
        row: PropTypes.string.isRequired,
    }),
    justifyItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    alignItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
};

const Item = ({ children, col, row, justify, align }) => {
    return (
        <div
            css={css`
                grid-column-start: ${col.s};
                grid-column-end: ${col.e};
                grid-row-start: ${row.s};
                grid-row-end: ${row.e};
                justify-self: ${justify};
                align-self: ${align};
            `}
        >
            {children}
        </div>
    );
};

Item.defaultProps = {
    row: {
        s: 1,
        e: 2,
    },
    col: {
        s: 1,
        e: 2,
    },
    justify: 'start',
    align: 'stretch',
};

Item.propTypes = {
    children: PropTypes.any,
    row: PropTypes.shape({
        s: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        e: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    col: PropTypes.shape({
        s: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        e: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    justify: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
    align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
};

Grid.Item = Item;

export default Grid;
