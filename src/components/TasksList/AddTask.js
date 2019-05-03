import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import toUnixTime from '../../utils/toUnixTime';
import timeDiff from '../../utils/timeDiff';

const styles = theme => ({
    root:{
        color: 'red'
    },
    menu: {
        width: 200,
    },
})

const time_format = [
    {
        value: 'minutes',
        label: 'Minutes'
    },
    {
        value: 'hours',
        label: 'Hours'
    },
    {
        value: 'days',
        label: 'Days'
    },
    {
        value: 'months',
        label: 'Months'
    }
]

class AddTask extends Component{
    state = {
        description: '',
        time_limit: 1,
        time_format: 'minutes',
        pledge_amount: 0,
        charity: 0
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const { open, fullScreen, classes, charities } = this.props;
        return (
            <Dialog open={open} fullScreen={fullScreen}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="task_desc"
                        label="Task Description"
                        type="text"
                        fullWidth
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                    />
                    <TextField
                        margin="dense"
                        id="task_timelimit"
                        label="Time Limit"
                        type="number"
                        fullWidth
                        value={this.state.time_limit}
                        onChange={this.handleChange("time_limit")}
                    />
                    <TextField
                        id="task_format"
                        select
                        label="Time Format"
                        value={this.state.time_format}
                        className={classes.textField}
                        onChange={this.handleChange('time_format')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select your currency"
                        margin="normal"
                        fullWidth
                    >
                        {time_format.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="task_pledgeAmount"
                        label="Pledged Amount"
                        type="number"
                        fullWidth
                        value={this.state.pledge_amount}
                        onChange={this.handleChange("pledge_amount")}
                    />
                    <TextField
                        id="task_charity"
                        select
                        label="Charity"
                        value={this.state.charity}
                        className={classes.textField}
                        onChange={this.handleChange('charity')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select a Charity"
                        margin="normal"
                        fullWidth
                    >
                        {charities.map((option, index) => (
                            <MenuItem key={index} value={index}>
                            {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseAdd} color="primary">
                        Add Task
                    </Button>
                    <Button onClick={this.handleCloseCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleCloseAdd = () => {
        // TODO: add check for all the values
        let time_now = Date.now();
        let time_limit = toUnixTime(time_now, this.state.time_limit, this.state.time_format);
        let task = {
            description: this.state.description,
            time_limit: time_limit,
            pledge_amount: this.state.pledge_amount,
            time_start: time_now,
            time_percent: timeDiff(time_now, time_limit),
            charity: this.state.charity

        }
        this.emptyState()
        this.props.close(task)
    }

    handleCloseCancel = () => {
        this.emptyState()
        this.props.close();
    }

    emptyState = () => {
        this.setState({
            description:'',
            time_limit: 1,
            pledge_amount: 0
        })
    }
}

export default withStyles(styles)(withMobileDialog()(AddTask));
