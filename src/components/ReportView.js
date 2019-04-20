import React, { Component } from 'react';
import PropType from 'prop-types';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import CircularProgress from "./CircularProgress";

const styles = theme => ({
    root:{
        backgroundColor: 'red'
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
            <React.Fragment>
                <CircularProgress numerator={status.pending} denominator={status_total}>Pending</CircularProgress>
                <CircularProgress numerator={status.completed} denominator={status_total}>Completed</CircularProgress>
                <CircularProgress numerator={status.failed} denominator={status_total}>Failed</CircularProgress>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ReportView);