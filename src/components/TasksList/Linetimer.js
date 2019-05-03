import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    root: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        border: '3px solid red'
    }
})

const LineTimer = ({time_percent, classes}) => (
    <div className={classes.root} style={{width: `${time_percent}%`}}></div>
)

export default withStyles(styles)(LineTimer);