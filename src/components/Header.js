import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        color: 'red',
        marginLeft: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 5, 
        display: 'flex',
        alignItems: 'center',
        textAlign: 'right',
        justifyContent: 'space-between',
        padding: theme.spacing.unit,
        borderBottom: '4px solid red'
    }
})

class Header extends Component {
    render() {
        const { classes, address, openCharity } = this.props
        return (
            <div className={classes.root}>
                <Typography>{address}</Typography>
                <Button color="primary" onClick={openCharity}>Support Charities</Button>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
} 

export default withStyles(styles)(Header)

