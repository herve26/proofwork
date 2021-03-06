import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import TasksList from './TasksList';
import ReportView from './ReportView';
import CharityView from './CharityView';
import Header from './Header';
import timeDiff from '../utils/timeDiff';
import getWeb3 from '../utils/getWeb3';
import TasksContract from "../contracts/Tasks.json";
import { web3Connect } from '../Store/actions/web3Action';
import { getAccount } from "../Store/actions/accountAction";
import { getContract } from "../Store/actions/contractAction";
import { fetchCharities } from '../Store/actions/charityAction';
// import './App.css';


const appBarHeight = 8

const styles = theme => ({
    root: {
	  ...theme.mixins.gutters(),
	//   display: 'flex',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
	},
	main: {
		flexGrow: 1,
		// display: 'flex',
		// marginLeft: theme.spacing.unit * 2,
		// border: '1px solid red'
	},
	tasksView:{
		flexGrow: 1
	},
	fab:{
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		maxHeight: theme.spacing.unit * appBarHeight
	},
	drawerPaper: {
		marginTop: theme.spacing.unit * appBarHeight
	},
	toolbar: theme.mixins.toolbar
});

let status = {
	pending: 0,
	completed: 0,
	failed: 0
}

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

let fetTasks = []

for (let i = 0; i < 20; i+=2) {
	fetTasks.push(fetched_tasks[0]);
	fetTasks.push(fetched_tasks[1]);
}

let fetch_charities = [
	{
		name: 'ballon',
		address: '0x000000000000000'
	}
]


class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			selectedList: 0,
			isAddTaskOpen: false,
			isCharityAddOpen: false,
			isDrawerOpen: false,
			tasks: [],
			web3: null,
			accounts: null,
			contract: null,
			charities: [],
			isowner: false,
			topayTask: {userid: [], taskid: []},
			tasks_status: status
		}
		this.initializeContract()

	}

	initializeContract = async () => {
		await this.props.web3Connect();
		await this.props.getAccount(this.props.web3)
		await this.props.getContract(this.props.web3)
		this.props.fetchCharities()
	}

	getFailedList =  async () => {
		const { accounts, contract, web3 } = this.state;
		const tx_max = 150;

		// console.log(arr, groups)
		try{
			let usersLen = parseInt(await contract.methods.getUsersLength().call({from:accounts[0]}))
			// console.log(usersLen)
			let taskpay = {userid:[], taskid:[]}
			for (let i = 0; i < usersLen; i++) {
				let pledgerLen = parseInt(await contract.methods.getUserTasksLength(i).call({from:accounts[0]}))
				// console.log(pledgerLen)
				for (let j = 0; j < pledgerLen; j++) {
					let task_state = await contract.methods.isTaskStateFailed(i, j, Date.now()).call({from:accounts[0]})
					// console.log(task_state)
					if(task_state){
						taskpay.userid.push(i)
						taskpay.taskid.push(j)
					}
				}
			}

			this.setState({topayTask: taskpay})
		}
		catch(error){
			console.log(error)
		}
	}

	sliceArr = (arr, size) => {
		return arr.map( (a,i) => {
			return i % size === 0 ? arr.slice(i, i+size) : null
		}).filter(a => (a))
	}

	componentDidMount = async () => {

		// this.interval = setInterval(this.refreshTasks, 3000)

		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = TasksContract.networks[networkId];
			const instance = new web3.eth.Contract(
				TasksContract.abi,
				deployedNetwork && deployedNetwork.address,
			);

			// Set web3, accounts, and contract to the state
			this.setState({ web3, accounts, contract: instance }, this.fetchTasks);
			this.checkOwner()
			this.getFailedList()
			this.fetchCharities()
			// console.log(this.state)
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
				);
				console.error(error);
			}
		};

	fetchTasks = async () => {
		const { accounts, contract, web3 } = this.state;
		let taskCount = parseInt(await contract.methods.Pledgers(accounts[0]).call({from: accounts[0]}))
		const tasks = []
		for (let i = 0; i < taskCount; i++) {
			tasks.push(this.parseTask(await contract.methods.showTask(i).call({from:accounts[0]})));
		}
		this.setState({tasks: tasks}, this.buildReport)
		// this.setState({tasks: fetTasks}, this.buildReport)
	}

	parseTask = (task) => {
		const {web3} = this.state;
		return {
			time_limit: parseInt(task[0]),
			time_start: parseInt(task[1]),
			description: task[2],
			pledge_amount: web3.utils.fromWei(task[3].toString()),
			status: Status_map[parseInt(task[4])]
		}
	}

	refreshTasks = () => {
		let tasks = this.state.tasks;
		let rebuildReport = false;
		let new_tasks = tasks.map((task, index) => {
			if(task.status && task.status.value > 0){
				task.time_percent = 0;
				return task;
			}

			if((task.time_percent && task.time_percent > 100)){
				rebuildReport = true;
				task.status = Status_map[2]
				task.time_percent = 0;
				return task;
			}

			task.time_percent = timeDiff(task.time_start, task.time_limit)
			return task;
		})
		if(rebuildReport)
			this.setState({tasks: new_tasks}, this.buildReport)
		else
			this.setState({tasks: new_tasks})
	}

	buildReport = () => {
		let tasks = this.state.tasks
		let tasks_status = {pending: 0, completed: 0, failed: 0}
		tasks.map((task, i) => {
			if(task.status.value == 0){
				tasks_status.pending ++
			}
			else if(task.status.value == 1){
				tasks_status.completed++;
			}
			else if(task.status.value == 2){
				tasks_status.failed++;
			}
		})

		this.setState({tasks_status: tasks_status}, this.refreshTasks)

	}

	fetchCharities = async () => {
		const { accounts, contract, web3 } = this.state;
		let charitiesLen = parseInt(await contract.methods.getCharitiesLength().call())
		let charities = []

		for (let index = 0; index < charitiesLen; index++) {
			charities.push(await contract.methods.getCharity(index).call())
		}
		charities = charities.map((charity) => {
			return {address: charity[0], name: charity[1]}
		})
		this.setState({charities: charities})
	}

	checkOwner = async () => {
		const {accounts, contract, web3 } = this.state;
		try {
			const owner = await contract.methods.getOwner().call({from: accounts[0]})
			if(owner){
				this.setState({isowner: true})
			}
		} catch (error) {
			if(error){
				this.setState({isowner: false})
			}
		}
	}

	render() {
		const { classes } = this.props;
		// const { isAddress } = this.state.web3.utils
		// console.log(this.props.web3)
		console.log(this.props.account)
		// console.log(this.props.contract)
		const { accounts, tasks_status } = this.state
		const account = accounts ? accounts[0] : accounts
		const fabShow = {0:true, 1: false, 2: this.state.isowner}
		const isAddress = this.state.web3 ? this.state.web3.utils.isAddress : null
		const asStatus = (tasks_status.completed > 0 || tasks_status.failed > 0 || tasks_status.pending > 0) ? true : false;
		return (
			<Grid className={classes.root}>
				<Header address={account} openCharity={this.handleCharityOpen} />
				<main className={classes.main}>
				<ReportView />
					<TasksList
						tasklist={this.state.tasks}
						charities={this.state.charities}
						isAddTaskOpen={this.state.isAddTaskOpen}
						handleCloseAdd={this.handleAddTask}
						handleOpenAdd={this.handleAdd}
						handleTaskCompleted={this.handleTaskCompleted}
						className={classes.tasksView}
					/>
				</main>
				<CharityView
					charities={this.state.charities}
					openAdd={this.state.isCharityAddOpen}
					handleCharityAdd={this.handleCharityAdd}
					isAddress={isAddress}
					isowner={this.state.isowner}
					tasksToPay={this.state.topayTask.userid.length}
					handlePayToCharity={this.handlePayCharity}
					handleClose={this.handleCharityClose}
				/>
			</Grid>
		);
	}

	handleAdd= (addName) => () => {
		// addName = 'isAddTaskOpen'
		if(!addName)
			return;

		// if(this.state.selectedList == 2){
		// 	addName = 'isCharityAddOpen'
		// }
		console.log(this.state.selectedList)
		this.setState({[addName]:true})
	}

	handleAddTask = (task) => {
		if(task){
			this.addTaskTransaction(task)
		}
		this.setState({isAddTaskOpen: false})
	}

	addTaskTransaction = async (task) => {
		const {accounts, contract, web3} = this.state;
		console.log(task)
		contract.methods.addTask(task.description, task.time_limit, task.time_start, this.state.charities[task.charity].address).send({from: accounts[0], value: web3.utils.toBN(web3.utils.toWei(task.pledge_amount))}).on("receipt", function(rcp){
			console.log(rcp)
			this.fetchTasks()
		})

	}

	handleMenu = () => {
		this.setState({isDrawerOpen: !this.state.isDrawerOpen})
	}
	handleMenuItem = (i) => () => {
		this.setState({selectedList: i, isDrawerOpen: !this.state.isDrawerOpen})
	}

	handleCharityAdd = async (charity) => {
		if(charity){
			const { accounts, contract, web3 } = this.state
			if(this.state.isowner){
				contract.methods.addCharity(charity.name, charity.address).send({from: accounts[0]})
			}
		}
		// this.setState({isCharityAddOpen: false})
	}

	handleCharityOpen = () => {
		console.log('open')
		this.setState({isCharityAddOpen: true})
	}

	handleCharityClose = () => {
		console.log('close charity')
		this.setState({isCharityAddOpen: false})
	}

	handleTaskCompleted = async (index) => {
		// TODO: wrap the function in a try
		// TODO: find a solution for await with receipt for transaction
		if(this.state.tasks[index]){
			const { accounts, contract, web3 } = this.state
			await contract.methods.completeTask(index, Date.now()).send({from: accounts[0]})
		}
		console.log(this.state.tasks[index])
	}

	handlePayCharity = async () => {
		const { accounts, contract, web3 } = this.state;
		let taskpay = this.state.topayTask;
		let tx_max = 150;

		if(taskpay.userid.length && taskpay.userid.length == taskpay.taskid.length){

			taskpay.userid = this.sliceArr(taskpay.userid, tx_max);
			taskpay.taskid = this.sliceArr(taskpay.taskid, tx_max);
			for(let i=0; i < taskpay.userid.length; i++){
				await contract.methods.payCharities(taskpay.userid[i], taskpay.taskid[i]).send({from:accounts[0]})
			}
		}
		this.getFailedList()
		console.log(taskpay)
	}
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	web3: state.web3.instance,
	account: state.account.instance,
	contract: state.contract.instance
})

const mapDispatchToProps = (dispatch) => ({
	web3Connect: dispatch(web3Connect),
	getAccount: web3 => getAccount(web3)
})
// const ConnectedApp = connect(null, { web3Connect })(App);

export default connect(mapStateToProps, {web3Connect, getAccount, getContract, fetchCharities })(withStyles(styles)(App));
