import dom from './dom';

export const hasKey = key => {
    return dom.canUse && window[key];
};

export const getValue = (key, defaultValue = null) => {
    return dom.canUse ? window[key] : defaultValue;
};

export default {
    hasKey,
    getValue,
};
