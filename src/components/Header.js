import React, { Component } from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        color: 'red',
        marginLeft: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit, 
        display: 'flex',
        alignItems: 'center',
        border: '1px solid red'
    }
})

class Header extends Component {
    render() {
        const { classes, address, openCharity } = this.props
        return (
            <div className={classes.root}>
                <Typography>{address}</Typography>
                <Button color="secondary" onClick={openCharity}>Support Charities</Button>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
} 

export default withStyles(styles)(Header)

