import { FETCH_TASKS, NEW_TASKS } from './types';


const Status_map = [{value: 0, label: 'Pending'}, {value: 1, label:'Completed'}, {value: 2, label: 'Failed'}]

let fetched_tasks = [
	{
		description: 'Water Mellon',
		time_limit: Date.now() + 2500,
		pledge_amount: 4,
		time_start: Date.now(),
		status: Status_map[0]
	},
	{
		description: 'Drink More Water',
		time_limit: Date.now() + 1442550,
		pledge_amount: 3,
		time_start: Date.now(),
		status: Status_map[1]
	}
]


export const fetchTasks = () => dispatch => {
    return dispatch({type: FETCH_TASKS, payload: fetched_tasks})   
}