import uuidv4 from 'uuid/v4';

export const timeout = delay => {
    const id = uuidv4();
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(id);
        }, delay);
    });
    return [promise, id];
};
