import { timeout } from '../../../utils/timeout';
const { logger } = require('../../../../server/logger');

export const ssrResolveData = async (ssrDataList, time) => {
    for (let index = 0; index < ssrDataList.length; index++) {
        const ssrData = ssrDataList[index];
        if (!ssrData.resolved) {
            const [timer, id] = timeout(time.left());
            try {
                const result = await Promise.race([timer, ssrData.item()]);
                if (result != id) {
                    ssrData.resolved = true;
                    ssrData.result = result;
                } else {
                    break;
                }
            } catch (error) {
                logger.error(error);
            }
        }
    }
};

export const getTasksState = tasks => {
    return tasks
        .filter(t => t.resolved)
        .map(t => ({
            id: t.id,
            result: t.result,
        }));
};
