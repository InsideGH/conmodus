import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleWare from 'redux-thunk';
import rootReducer from './reducers';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare));

export default createStore(rootReducer, {}, enhancer);

// Create a fresh store.
const makeFreshStore = function() {
    return createStore(rootReducer, {}, enhancer);
};

export { makeFreshStore };
