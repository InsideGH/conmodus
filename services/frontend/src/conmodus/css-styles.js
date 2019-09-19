const config = require('../server/config');
const fs = require('fs');
const path = require('path');

function createCssStyles() {
    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist', 'manifest.json'), 'utf-8'));
    const cssKeys = Object.keys(manifest).filter(e => e.endsWith('css'));

    const css = cssKeys.reduce((acc, key) => {
        return acc + fs.readFileSync(path.join(__dirname, '../../', manifest[key]), 'utf-8') + ' ';
    }, ' ');

    return `<style>${css}</style>`;
}

const cachedCssStyles = (() => {
    if (config.NODE_ENV == 'production') {
        return createCssStyles();
    }
})();

module.exports = async () => {
    return config.NODE_ENV == 'production' ? cachedCssStyles : createCssStyles();
};
