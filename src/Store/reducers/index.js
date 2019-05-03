import { combineReducers } from "redux";
import taskReducer from './taskReducer';
import web3Reducer from './web3Reducer';

export default combineReducers(
    {
        tasks: taskReducer, 
        web3: web3Reducer
    }
)