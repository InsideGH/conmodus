import { timeout } from '../../../utils/timeout';
const { logger } = require('../../../../server/logger');

export const ssrResolveThunks = async (thunks, dispatch, time) => {
    for (let index = 0; index < thunks.length; index++) {
        const thunk = thunks[index];
        if (!thunk.resolved) {
            const [timer, id] = timeout(time.left());
            try {
                const result = await Promise.race([timer, thunk.item(dispatch)]);
                if (result != id) {
                    thunk.resolved = true;
                } else {
                    break;
                }
            } catch (error) {
                logger.error(error);
            }
        }
    }
};
