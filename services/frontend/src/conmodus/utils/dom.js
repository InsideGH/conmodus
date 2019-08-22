export const canUse = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const removeChild = id => {
    if (canUse) {
        const scriptElement = document.getElementById(id);
        if (scriptElement) {
            scriptElement.parentNode.removeChild(scriptElement);
        }
    }
};

export default {
    canUse,
    removeChild,
};
