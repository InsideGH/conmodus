const db = require('./db');
const models = require('./models/');
const { logger } = require('../logger');

const seedInstallation = async () => {
    const installCount = await models.Installation.count();
    logger.info(`Found ${installCount} installation entries in DB`);

    if (installCount == 0) {
        logger.info('Initializing installation entry to NOT_STARTED');
        await models.Installation.create({
            type: 'NOT_STARTED',
        });
    } else if (installCount == 1) {
        const installation = await models.Installation.findOne();
        logger.info('The current initialization entry is', installation);
    } else if (installCount > 1) {
        throw new Error('Found multiple installations in database');
    }
};

const init = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sync({ force: true });
            await seedInstallation();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = init;
