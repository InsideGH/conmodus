import actionTypes from './action-types';

const initialState = {
    count: 5,
    loading: false,
    quote: undefined,
    quote2: undefined,
};

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COUNTER_DECREASE:
            return {
                ...state,
                count: state.count - action.amount,
            };
        case actionTypes.COUNTER_FETCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.COUNTER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                quote: action.quote,
            };
        case actionTypes.COUNTER_FETCH2:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.COUNTER_FETCH_SUCCESS2:
            return {
                ...state,
                loading: false,
                quote2: action.quote,
            };

        default:
            return state;
    }
};
