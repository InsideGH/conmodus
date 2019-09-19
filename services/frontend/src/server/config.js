if (process.env.CONMODUS_MODE == 'ssr') {
    if (!process.env.CONMODUS_TIMEOUT) {
        throw new Error('process.env.CONMODUS_TIMEOUT not defined!');
    }
    if (!process.env.CONMODUS_MAX_RENDERS) {
        throw new Error('process.env.CONMODUS_MAX_RENDERS not defined!');
    }
    if (!process.env.CONMODUS_REACT_ROOT) {
        throw new Error('process.env.CONMODUS_REACT_ROOT not defined!');
    }
    if (!process.env.NODE_ENV) {
        throw new Error('process.env.NODE_ENV not defined!');
    }
    if (!process.env.LOG_LEVEL) {
        throw new Error('process.env.LOG_LEVEL not defined!');
    }
}

exports.CONMODUS_TIMEOUT = process.env.CONMODUS_TIMEOUT;
exports.CONMODUS_MAX_RENDERS = process.env.CONMODUS_MAX_RENDERS;
exports.CONMODUS_REACT_ROOT = process.env.CONMODUS_REACT_ROOT;
exports.NODE_ENV = process.env.NODE_ENV;
exports.LOG_LEVEL = process.env.LOG_LEVEL;
