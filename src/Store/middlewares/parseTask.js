import { FETCH_TASKS } from "../actions/types";
import Status_map from '../../utils/statusMap';

export default store => next => action => {
    if(action.type === FETCH_TASKS){
        const web3 = store.getState().web3.instance;
        const payload = action.payload.map(task => ({
            time_limit: parseInt(task[0]),
            time_start: parseInt(task[1]),
            description: task[2],
            pledge_amount: web3.utils.fromWei(task[3].toString()),
            status: Status_map[parseInt(task[4])]
        }))
        action.payload = payload
    }
    return next(action)
} 