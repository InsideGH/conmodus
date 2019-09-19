const config = require('../server/config');
const fs = require('fs');
const path = require('path');

function readStats() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist', 'loadable-stats.json'), 'utf-8'));
}

const cachedStats = (() => {
    if (config.NODE_ENV == 'production') {
        return readStats();
    }
})();

module.exports = async () => {
    return config.NODE_ENV == 'production' ? cachedStats : readStats();
};
