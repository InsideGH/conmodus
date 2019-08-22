import dom from '../../utils/dom';

export const ssrDataHandlerServer = (ssrDataList, id, payload) => {
    if (!dom.canUse) {
        const entry = ssrDataList.find(p => p.id == id);
        if (!entry) {
            ssrDataList.push({
                resolved: false,
                item: payload,
                id,
            });
        }
    }
};
export const ssrDataHandlerClient = async (ssrDataListFromServer, update, id, payload) => {
    if (dom.canUse) {
        const entry = ssrDataListFromServer.find(e => e.id == id);
        if (!entry) {
            const data = await payload();
            update(id, data);
        } else {
            const index = ssrDataListFromServer.findIndex(e => e.id == id);
            if (index != -1) {
                ssrDataListFromServer.splice(index, 1);
            }
        }
    }
};
