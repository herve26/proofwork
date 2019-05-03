import { FETCH_TASKS, NEW_TASKS, UPDATE_TASKS_TIME } from './types';

export const fetchTasks = (account, contract) => async dispatch => {
	const taskCount = parseInt(await contract.methods.Pledgers(account[0]).call({from: account[0]}))
	const tasks = []
	for(let i=0; i < taskCount; i++){
		tasks.push(await contract.methods.showTask(i).call({from: account[0]}))
	}
    dispatch({type: FETCH_TASKS, payload: tasks})   
}

// export const () => dispatch => {
// 	const interval = setTimeout()
// }