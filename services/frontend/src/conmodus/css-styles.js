const config = require('../server/config');

let cssStyles;
if (config.NODE_ENV == 'production') {
    const fs = require('fs');
    const path = require('path');

    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist', 'manifest.json'), 'utf-8'));
    const cssKeys = Object.keys(manifest).filter(e => e.endsWith('css'));

    const css = cssKeys.reduce((acc, key) => {
        return acc + fs.readFileSync(path.join(__dirname, '../../', manifest[key]), 'utf-8') + ' ';
    }, ' ');

    cssStyles = `<style>${css}</style>`;
}

const getCssStyles = async () => {
    if (config.NODE_ENV == 'production') {
        return cssStyles;
    } else {
        const axios = require('axios');

        const { data: manifest } = await axios.get(`http://localhost:${config.CONMODUS_BUNDLES_PORT}/dist//manifest.json`);

        const cssKeys = Object.keys(manifest).filter(e => e.endsWith('css'));
        let css = ' ';
        for (let i = 0; i < cssKeys.length; i++) {
            const entry = cssKeys[i];
            const res = await axios.get(`http://localhost:${config.CONMODUS_BUNDLES_PORT}/dist/${entry}`);
            css += res.data;
        }

        return `<style>${css}</style>`;
    }
};

module.exports = getCssStyles;
