import { FETCH_TASKS } from "../actions/types";
// parseTask = (task) => {
//     
//     return {
//         time_limit: parseInt(task[0]),
//         time_start: parseInt(task[1]),
//         description: task[2],
//         pledge_amount: web3.utils.fromWei(task[3].toString()),
//         status: Status_map[parseInt(task[4])]
//     }
// }

const Status_map = [{value: 0, label: 'Pending'}, {value: 1, label:'Completed'}, {value: 2, label: 'Failed'}]

export default store => next => action => {
    console.log(action.type === FETCH_TASKS)
    if(action.type === FETCH_TASKS){
        console.log('task list')
        console.log(store.getState().web3)
        console.log(action.payload)
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