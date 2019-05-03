import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import parseTask from './middlewares/parseTask';

const initialState = {}
const middlewares = [parseTask, thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

export default store;