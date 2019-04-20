import React, { Component } from 'react';
import { Card, CardContent, Typography, withStyles, IconButton } from '@material-ui/core';
import { AccessTime, Done as DoneIcon, Clear as ClearIcon } from '@material-ui/icons';
import LineTimer from './Linetimer';
import PropTypes from 'prop-types';
import toLocalDate from '../utils/localdate';

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        marginBottom: theme.spacing.unit * 2
    },
    content: {
        flex: '1 0 auto',
        borderRight: '1px solid red'
    },
    media: {
        margin: 'auto',
        padding: 0,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32
    }, 
    doneIcon: {
        margin: theme.spacing.unit,
        fontSize: 32,
        color: 'green'
    },
    details: {
        display: 'flex'
    },
    date: {
        marginRight: theme.spacing.unit * 2
    }
});

class Task extends Component{
    render() {
        const { classes, task_desc, timeend, pledge_amn, time_percent, index, status } = this.props;
        const statusArray = [
                <IconButton className={classes.media} onClick={this.handleClick(index)}>
                    <AccessTime className={classes.icon}/>
                </IconButton>,
                <div className={classes.media}>
                    <DoneIcon className={classes.doneIcon}/>
                </div>,
                <div className={classes.media}>
                    <ClearIcon className={classes.icon}/>
                </div>
        ]
        return (
            <Card className={classes.root} elevation={1} square>
                {time_percent > 0 && <LineTimer time_percent={time_percent} />}
                <CardContent className={classes.content}>
                    <Typography variant="h6" component="h4">
                        {task_desc}
                    </Typography>
                    <div className={classes.details}>
                        <Typography component="p" className={classes.date}>
                            {toLocalDate(timeend)}
                        </Typography>
                        <Typography>
                            {pledge_amn} ETH
                        </Typography>
                    </div>
                </CardContent>
                {statusArray[status.value]}
            </Card>
        )
    }

    handleClick = (index) => () => {
        console.log('clicked', index)
        this.props.handleTaskCompleted(index)
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Task);