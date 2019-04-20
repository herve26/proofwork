import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Task from './Task';
import AddTask from './AddTask';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
});

class TasksList extends Component{
    render(){
        let {tasklist, handleCloseAdd, charities, isAddTaskOpen, handleTaskCompleted} = this.props;
        let tasks = tasklist.map((task, index) => 
            <Task 
                key={index} 
                task_desc={task.description} 
                timeend={task.time_limit} 
                pledge_amn={task.pledge_amount} 
                time_percent={task.time_percent}
                index={index}
                handleTaskCompleted={handleTaskCompleted}
                status={task.status}
            />
        );
        return(
            <div className={this.props.classes.root}>
                {tasks}
                <AddTask open={isAddTaskOpen} close={handleCloseAdd} charities={charities} />
            </div>
        )
    }
}

TasksList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TasksList);
