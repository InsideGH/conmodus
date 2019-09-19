import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleWare from 'redux-thunk';
import rootReducer from './reducers';
import win from '../../conmodus/utils/win';
import dom from '../../conmodus/utils/dom';

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare));

// Create a store
// If browser, it will be initialized from window redux data from server.
const initialStore = win.getValue('__CONMODUS_REDUX_DATA', {});
dom.removeChild('__CONMODUS_REDUX_DATA');
export default createStore(rootReducer, initialStore, enhancer);

// Create a fresh store.
const makeFreshStore = function() {
    return createStore(rootReducer, {}, enhancer);
};

export { makeFreshStore };
