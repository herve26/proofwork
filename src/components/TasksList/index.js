import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTasks, updateTasksTime, updateTasksStatus } from '../../Store/actions/tasksAction';
import Task from './Task';
import AddTask from './AddTask';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      flexGrow: 1,
    //   border: '1px solid red',
    //   borderRight: '2px solid gray'
    },
    addButton: {
        borderRadius: 0,
        boxShadow: 'none',
    },
    addIcon: {
        marginLeft: theme.spacing.unit
    },
    taskList: {
        marginTop: theme.spacing.unit * 2,
        // border: '1px solid blue'
    }
});

class TasksList extends Component{
    state = {
        tasks_percent: []
    }

    timeDiff = function(start_date, end_date){
        return (Date.now() - start_date) * 100 / (end_date - start_date);
    }

    componentWillUnmount() {
        console.log('it is unmonting the f')
        this.cancelUpdate()
    }

    render() {
        let {classes, handleCloseAdd, handleOpenAdd, charities, isAddTaskOpen, handleTaskCompleted} = this.props;
        if(this.props.web3 &&
            this.props.account &&
            this.props.contract &&
            !(this.props.tasks.length > 0)
        ){
            this.props.fetchTasks(this.props.account, this.props.contract);
        }

        if(this.props.tasks.length > 0 && !this.props.isUpdating){
            this.cancelUpdate = this.props.updateTasksTime(this.props.tasks)
            this.props.updateTasksStatus()
        }

        console.log(this.props.tasks)
        console.log(this.props.status)
        let percents = []
        let tasks = this.props.tasks.map((task, index) => {
            return (
                    <Task
                        key={index}
                        task_desc={task.description}
                        timeend={task.time_limit}
                        timestart={task.time_start}
                        pledge_amn={task.pledge_amount}
                        time_percent={task.time_percent}
                        index={index}
                        handleTaskCompleted={handleTaskCompleted}
                        status={task.status}
                    />
                )
            }
        );

        return(
            <div className={classes.root}>
                <Button className={classes.addButton} onClick={handleOpenAdd('isAddTaskOpen')} variant="contained" color="primary">
                    Add Task
                    <AddIcon/>
                </Button>
                <div className={classes.taskList}>
                    {tasks}
                </div>
                <AddTask open={isAddTaskOpen} close={handleCloseAdd} charities={charities} />
            </div>
        )
    }
}

TasksList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    tasks: state.tasks.items,
    isUpdating: state.tasks.isUpdatingTasks,
    web3: state.web3.instance,
    account: state.account.instance,
    contract: state.contract.instance,
    status: state.tasks.status
})

const StyledTaskList = withStyles(styles)(TasksList);

export default connect(mapStateToProps, {fetchTasks, updateTasksTime, updateTasksStatus })(StyledTaskList)
