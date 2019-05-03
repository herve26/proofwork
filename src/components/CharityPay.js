import React, { Component } from 'react';
import  { withStyles, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        color: 'red'
    }
})

class CharityPay extends Component {
    render() {
        const { classes, tasksToPay, handleClick, payCard} = this.props
        return (
            <React.Fragment>
            { payCard && <div>
                <CardContent>
                    <Typography component="p">You can send the amount of {tasksToPay} task{tasksToPay>1? "s": ""} to Charities</Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={handleClick} fullWidth>Donate to Charities</Button>
                </CardActions>
            </div>}
            </React.Fragment>
        )
    }
}

CharityPay.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CharityPay)