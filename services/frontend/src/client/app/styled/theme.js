const FOOTER_HEIGHT_1 = 80;
const FOOTER_HEIGHT_2 = 120;

const theme = {
    fontFamily: 'sans-serif',
    body: {
        bgColor: '#222',
        paddingBottom: [FOOTER_HEIGHT_1, FOOTER_HEIGHT_2],
    },
    font: {
        fontFamily: 'sans-serif',
        color: '#a6a6a6',
    },
    footer: {
        height1: FOOTER_HEIGHT_1,
        height2: FOOTER_HEIGHT_2,
        duration: {
            moveUp: 0.5,
            delay: 0.4,
            fadeLine: 0.3,
        },
        lineColor: '#329212',
        bgColor: '#000',
    },
};

export default theme;
