import dom from '../../utils/dom';

export const ssrThunkHandler = (collectedThunks, id, thunk) => {
    if (!dom.canUse) {
        const entry = collectedThunks.find(p => p.id == id);
        if (!entry) {
            collectedThunks.push({
                resolved: false,
                item: thunk,
                id,
            });
        }
        return () => {};
    }
    return thunk;
};

export default ssrThunkHandler;
