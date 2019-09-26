import makeActionCreator from '../make-action-creator';
import actionTypes from './action-types';

export const decrease = makeActionCreator(actionTypes.COUNTER_DECREASE, 'amount');
const fetch = makeActionCreator(actionTypes.COUNTER_FETCH);
const fetchSuccess = makeActionCreator(actionTypes.COUNTER_FETCH_SUCCESS, 'quote');
const fetch2 = makeActionCreator(actionTypes.COUNTER_FETCH2);
const fetchSuccess2 = makeActionCreator(actionTypes.COUNTER_FETCH_SUCCESS2, 'quote');

const delay = amount =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, amount);
    });

export function fetchQuote() {
    return async function(dispatch) {
        dispatch(fetch());
        await delay(50);
        dispatch(fetchSuccess("It's a miracle"));
    };
}

export function fetchQuote2() {
    return async function(dispatch) {
        dispatch(fetch2());
        await delay(50);
        dispatch(fetchSuccess2("It's a deal"));
    };
}
