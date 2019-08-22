import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleWare from 'redux-thunk';
import rootReducer from './reducers';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare));

export default function(initialStore) {
    return createStore(rootReducer, initialStore, enhancer);
}
