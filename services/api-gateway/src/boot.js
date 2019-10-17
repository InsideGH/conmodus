const { logger } = require('./logger');
const db = require('./sequelize/db');
const tryPromise = require('./sequelize/try-promise');
const startServer = require('./server.js');
const dbInit = require('./sequelize/init');

const tries = 60;
const delay = 1000;

const start = async () => {
    tryPromise({
        tries,
        delay,
        test: i =>
            Promise.all([
                new Promise(async (resolve, reject) => {
                    try {
                        await db.authenticate();
                        logger.info(`Postgres connection OK.`);
                        resolve();
                    } catch (error) {
                        logger.info(`Postgres connection ${i}/${tries} failed. Trying again in ${delay}ms...`);
                        reject(error);
                    }
                }),
            ]),
    })
        .then(async () => {
            await dbInit();
            logger.info(`Postgres db INITIALIZED.`);
            startServer();
        })
        .catch(error => {
            logger.error(error);
            process.exit(1);
        });
};

start();
