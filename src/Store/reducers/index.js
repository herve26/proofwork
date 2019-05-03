import { combineReducers } from "redux";
import taskReducer from './taskReducer';
import web3Reducer from './web3Reducer';
import accountReducer from './accountReducer';
import contractReducer from "./contractReducer";


export default combineReducers(
    {
        tasks: taskReducer, 
        web3: web3Reducer,
        account: accountReducer,
        contract: contractReducer
    }
)