import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { withStyles } from '@material-ui/core';
import CircularProgress from "./CircularProgress";

const margin_factor = 4
const sideWidth = 120

const styles = theme => ({
    root:{
        marginLeft: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 5,
        display: 'flex',
        justifyContent: 'space-between',
        // border: '1px solid red'
    },
    fixedSide: {
        border: '1px solid green'
    },
    number:{
        textAlign: 'right'
    }
})

class ReportView extends Component{
    render() {
        const { classes, status } = this.props;
        console.log(status)
        const status_total = status.pending + status.completed + status.failed;
        return (
          <React.Fragment>
          {status_total > 0 &&
            <div className={classes.root}>
                <CircularProgress numerator={status.pending} denominator={status_total}>Pending</CircularProgress>
                <CircularProgress numerator={status.completed} denominator={status_total}>Completed</CircularProgress>
                <CircularProgress numerator={status.failed} denominator={status_total}>Failed</CircularProgress>
            </div>
          }
          </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
  status: state.tasks.status
})


export default connect(mapStateToProps)(withStyles(styles)(ReportView));
