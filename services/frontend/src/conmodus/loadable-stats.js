const config = require('../config');

let stats;
if (process.env.NODE_ENV == 'production') {
    const fs = require('fs');
    const path = require('path');
    stats = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dist', 'loadable-stats.json'), 'utf-8'));
}

const getLoadableStats = async () => {
    if (process.env.NODE_ENV == 'production') {
        return stats;
    } else {
        const axios = require('axios');
        const { data: stats } = await axios.get(`http://localhost:${config.CONMODUS_BUNDLES_PORT}/dist/loadable-stats.json`);
        return stats;
    }
};

module.exports = getLoadableStats;
