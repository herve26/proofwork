import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import LineTimer from './Linetimer';
import PropTypes from 'prop-types';
import toLocalDate from '../../utils/localdate';

const maxTaskWidth = '50%'
const primaryPalette = 100

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        marginBottom: theme.spacing.unit * 2,
        boxShadow: 'none',
        border: '1px solid rgba(0,0,0,0.07)'
        // maxWidth: maxTaskWidth
    },
    media: {
        margin: 'auto',
        padding: 0,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    },
    doneIcon: {
        margin: theme.spacing.unit,
        fontSize: 32,
        color: 'green'
    },
    desc: {
        width: '25%'
    },
    details: {
        flex: '1 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: theme.spacing.unit * 6
    },
    date: {
        marginRight: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 4
    },
    state_indicator: {
        minWidth: 64,
        margin: 'auto',
        padding: 0,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    }
});

class Task extends Component{
    render() {
        const { classes, task_desc, timeend, timestart, pledge_amn, time_percent, index, status } = this.props;
        const state_color = status.value > 0 ? (status.value == 1 ? 'green': 'red') : '';
        const state_border = state_color ? '4px solid ' + state_color : '';
        return (
            <Card className={classes.root} style={{borderRight: state_border}} elevation={1} square>
                {time_percent > 0 && <LineTimer time_percent={time_percent} />}
                <CardContent className={classes.details}>
                    <Typography variant="h6" component="p" className={classes.desc}>
                        {task_desc}
                    </Typography>
                    <Typography component="p" className={classes.date}>
                        {toLocalDate(timestart)}
                    </Typography>
                    <Typography component="p" className={classes.date}>
                        {toLocalDate(timeend)}
                    </Typography>
                    <Typography>
                        {pledge_amn} ETH
                    </Typography>
                </CardContent>
                <div className={classes.state_indicator}>
                    {status.value == 0 && 
                    <IconButton className={classes.media} onClick={this.handleClick(index)}>
                        <DoneIcon className={classes.doneIcon} />
                    </IconButton>}
                </div>
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