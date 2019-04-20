import React, { Component } from 'react';
import {Grid, Fab, withStyles, AppBar, Toolbar, IconButton, Hidden } from '@material-ui/core';
import { Add as AddIcon, Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import TasksList from './TasksList';
import AddTask from './AddTask';
import ReportView from './ReportView';
import CharityView from './CharityView';
import DrawerMenu from './DrawerMenu';
import timeDiff from '../utils/timeDiff';
import getWeb3 from '../utils/getWeb3';
import toLocalDate from '../utils/localdate';
import TasksContract from "../contracts/Tasks.json";
// import './App.css';

const appBarHeight = 8

const styles = theme => ({
    root: {
	  ...theme.mixins.gutters(),
	  display: 'flex',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
	},
	main: {
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

let fetched_tasks = [
	{
		description: 'Water Mellon',
		time_limit: Date.now() + 122500,
		pledge_amount: 4,
		time_start: Date.now()
	},
	{
		description: 'Drink More Water',
		time_limit: Date.now() + 1442550,
		pledge_amount: 3,
		time_start: Date.now()
	}
]

let status = {
	pending: 0,
	completed: 0,
	failed: 0
}

const Status_map = [{value: 0, label: 'Pending'}, {value: 1, label:'Completed'}, {value: 2, label: 'Failed'}]

let fetch_charities = [
	{
		name: 'ballon',
		address: '0x000000000000000'
	}
]


class App extends Component {
	state = {
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

	getFailedList =  async () => {
		const { accounts, contract, web3 } = this.state;
		const tx_max = 150;

		// console.log(arr, groups)
		try{
			let usersLen = parseInt(await contract.methods.getUsersLength().call({from:accounts[0]}))
			console.log(usersLen)
			let taskpay = {userid:[], taskid:[]}
			for (let i = 0; i < usersLen; i++) {
				let pledgerLen = parseInt(await contract.methods.getUserTasksLength(i).call({from:accounts[0]}))
				console.log(pledgerLen)
				for (let j = 0; j < pledgerLen; j++) {
					let task_state = await contract.methods.isTaskStateFailed(i, j, Date.now()).call({from:accounts[0]})
					console.log(task_state)
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

		this.interval = setInterval(() => {
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
					return task;	
				}

				task.time_percent = timeDiff(task.time_start, task.time_limit)
				return task;
			})

			if(rebuildReport)
				this.setState({tasks: new_tasks}, this.buildReport)
			else
				this.setState({tasks: new_tasks})

		}, 3000)

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
			console.log(this.state)
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

		this.setState({tasks_status: tasks_status})

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
		const { accounts } = this.state
		const fabShow = {0:true, 1: false, 2: this.state.isowner}
		const isAddress = this.state.web3 ? this.state.web3.utils.isAddress : null
		const mainView = [
							<TasksList 
								tasklist={this.state.tasks} 
								charities={this.state.charities} 
								isAddTaskOpen={this.state.isAddTaskOpen}
								handleCloseAdd={this.handleAddTask} 
								handleTaskCompleted={this.handleTaskCompleted}
							/>, 
							<ReportView status={this.state.tasks_status} />,
							<CharityView 
								charities={this.state.charities} 
								openAdd={this.state.isCharityAddOpen} 
								handleCharityAdd={this.handleCharityAdd}
								isAddress={isAddress}
								isowner={this.state.isowner}
								tasksToPay={this.state.topayTask.userid.length}
								handlePayToCharity={this.handlePayCharity} />
						]

		return (
			<Grid className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Hidden smUp>
							<IconButton aria-label="menu" onClick={this.handleMenu}>
								{ this.state.isDrawerOpen ? <CloseIcon/> : <MenuIcon/> }
							</IconButton>
						</Hidden>
						<header className="App-header">
						</header>
					</Toolbar>
				</AppBar>
				<DrawerMenu 
					isDrawerOpen={this.state.isDrawerOpen} 
					handleMenuItem={this.handleMenuItem} 
					selectedList={this.state.selectedList} 
				
				/>
				<main className={classes.main}>
					<div className={classes.toolbar} />
					{mainView[this.state.selectedList]}
				</main>
				{fabShow[this.state.selectedList] && <Fab className={classes.fab} onClick={this.handleAdd}>
					<AddIcon />
				</Fab>}
			</Grid>
		);
	}

	handleAdd= () => {
		let addName = 'isAddTaskOpen'
		if(this.state.selectedList == 2){
			addName = 'isCharityAddOpen'
		}
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

export default withStyles(styles)(App);
