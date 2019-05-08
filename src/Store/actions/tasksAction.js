import {
					FETCH_TASKS,
					NEW_TASK,
					UPDATE_TASKS_TIME,
					START_TASKS_UPDATE,
					STOP_TASKS_UPDATE,
					UPDATE_TASKS_STATUS
				} from './types';
import percentageTime from '../../utils/timeDiff';
import Status_map from '../../utils/statusMap';
import isEqual from '../../utils/isEqual';

export const fetchTasks = (account, contract) => async dispatch => {
	const taskCount = parseInt(await contract.methods.Pledgers(account[0]).call({from: account[0]}))
	const tasks = []
	for(let i=0; i < taskCount; i++){
		tasks.push(await contract.methods.showTask(i).call({from: account[0]}))
	}
    dispatch({type: FETCH_TASKS, payload: tasks})
}

export const updateTasksTime = () => (dispatch, getState) => {
	const interval = setInterval(() => {
		const tasks = getState().tasks.items;

		let new_tasks = tasks.map((task, index) => {
			if(task.status && task.status.value > 0){
				task.time_percent = 0;
				return task;
			}

			if((task.time_percent && task.time_percent > 100)){
				task.status = Status_map[2]
				task.time_percent = 0;
				return task;
			}

			task.time_percent = percentageTime(task.time_start, task.time_limit)
			return task;
		})

		if(!isEqual(new_tasks, tasks))
			dispatch({type: UPDATE_TASKS_TIME, payload: new_tasks})

	}, 2000)

	if(interval){
		dispatch({type: START_TASKS_UPDATE})
	}

	return function cancel(){
		clearInterval(interval)
		dispatch({type: STOP_TASKS_UPDATE})
	}
}

export const new_task = (task) => async (dispatch,getState) => {
	console.log(task)
	console.log(getState())

	try{
		const state = getState()
		const contract = state.contract.instance
		const account = state.account.instance
		const web3 = state.web3.instance
		const charities = state.charity.items
		await contract.methods.addTask(
				task.description,
				task.time_limit,
				task.time_start,
				charities[task.charity].address
		).send(
			{
				from: account[0],
				value: web3.utils.toBN(web3.utils.toWei(task.pledge_amount))
			}
		)
		dispatch({type: NEW_TASK, payload: task})
	}
	catch(error){
		console.log(error)
	}
}

export const updateTasksStatus = () => (dispatch, getState) => {
	const tasks = getState().tasks.items;
	console.log(tasks);
	if(tasks.length > 0){
		let status = {pending: 0, completed: 0, failed: 0}
		tasks.map(task => {
			switch (task.status.value) {
				case 0:
					status.pending++;
					break;
				case 1:
					status.completed++;
					break;
				case 2:
					status.failed++;
					break;
				default:
					break;
			}
		})

		dispatch({type:UPDATE_TASKS_STATUS, payload: status})
	}
}
