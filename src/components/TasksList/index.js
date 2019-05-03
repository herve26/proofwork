import React, { Component } from 'react';
import { withStyles, Fab, Button } from '@material-ui/core';
import { Add as AddIcon } from "@material-ui/icons";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTasks } from '../../Store/actions/tasksAction';
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

    componentDidMount(){
        this.props.fetchTasks();
    }

    render(){
        let {classes, tasklist, handleCloseAdd, handleOpenAdd, charities, isAddTaskOpen, handleTaskCompleted} = this.props;
        console.log(this.props.tasks)
        let tasks = this.props.tasks.map((task, index) => 
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
    tasks: state.tasks.items
})

const StyledTaskList = withStyles(styles)(TasksList);

export default connect(mapStateToProps, {fetchTasks})(StyledTaskList)