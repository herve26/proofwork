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


// const { accounts, contract, web3 } = this.state;
// let taskCount = parseInt(await contract.methods.Pledgers(accounts[0]).call({from: accounts[0]}))
// const tasks = []
// for (let i = 0; i < taskCount; i++) {
// 	tasks.push(this.parseTask(await contract.methods.showTask(i).call({from:accounts[0]})));
// }
// this.setState({tasks: tasks}, this.buildReport)

export const fetchTasks = (account, contract) => async dispatch => {
	const taskCount = parseInt(await contract.methods.Pledgers(account[0]).call({from: account[0]}))
	const tasks = []
	for(let i=0; i < taskCount; i++){
		tasks.push(await contract.methods.showTask(i).call({from: account[0]}))
	}
    dispatch({type: FETCH_TASKS, payload: tasks})   
}