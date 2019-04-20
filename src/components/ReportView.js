import React, { Component } from 'react';
import PropType from 'prop-types';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

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

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell className={classes.number}>Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Pending</TableCell>
                        <TableCell className={classes.number}>{status.pending}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Completed</TableCell>
                        <TableCell className={classes.number}>{status.completed}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Failed</TableCell>
                        <TableCell className={classes.number}>{status.failed}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell className={classes.number}>{status.pending + status.completed + status.failed}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(ReportView);