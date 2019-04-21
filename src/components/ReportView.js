import React, { Component } from 'react';
import PropType from 'prop-types';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import CircularProgress from "./CircularProgress";

const margin_factor = 4
const sideWidth = 120

const styles = theme => ({
    root:{
        position: 'relative',
        minWidth: sideWidth,
        marginLeft: theme.spacing.unit * margin_factor,
        marginRight: theme.spacing.unit * margin_factor,
        marginTop: theme.spacing.unit * margin_factor * 2,
        // border: '1px solid red'
    },
    fixedSide: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        // border: '1px solid green'
    },
    number:{
        textAlign: 'right'
    }
})

class ReportView extends Component{
    render() {
        const { classes, status } = this.props;
        const status_total = status.pending + status.completed + status.failed;
        return (
            <div className={classes.root}>
                <div className={classes.fixedSide}>
                    <CircularProgress numerator={status.pending} denominator={status_total}>Pending</CircularProgress>
                    <CircularProgress numerator={status.completed} denominator={status_total}>Completed</CircularProgress>
                    <CircularProgress numerator={status.failed} denominator={status_total}>Failed</CircularProgress>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ReportView);