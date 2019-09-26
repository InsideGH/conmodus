const timeout = delay => new Promise(resolve => setTimeout(() => resolve(), delay));

module.exports = ({ tries, delay, test }) =>
    new Promise(async (resolve, reject) => {
        for (let i = 0; i < tries; i++) {
            try {
                await test(i);
                return resolve();
            } catch (error) {
                if (i < tries - 1) {
                    await timeout(delay);
                } else {
                    return reject(error);
                }
            }
        }
    });
