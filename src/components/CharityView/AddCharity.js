import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
const styles = themes => ({
    root: {
        color: 'red'
    },
    action: {
        border: '1px solid red'
    }
})

class AddCharity extends Component {
    state = {
        name: '',
        address: ''
    }

    render() {
        const { classes, open, isowner } = this.props
        return (
            <React.Fragment>
            {isowner && <div >
                <CardContent>
                    <TextField
                        label="Name"
                        type="text"
                        id="charity_name"
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        label="Address"
                        type="text"
                        id="chairty_address"
                        fullWidth
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={this.handleCloseAdd} color="primary" fullWidth>
                        Add Charity
                    </Button>
                </CardActions>
            </div>}
            </React.Fragment>
        )
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    handleCloseAdd = () =>{
        console.log('close charity add')
        if(this.isValidInput(this.state)){
            this.props.handleCharityAdd(this.state)
            this.emptyState()
        }
    }

    handleCloseCancel = () => {
        console.log('close charity cancel')
        this.props.handleCharityAdd()
        this.emptyState()
    }

    emptyState = () => {
        this.setState({name: '', address: ''})
    }

    isValidInput = (charity) => {
        if(charity.name && this.props.isAddress(charity.address))
            return true
        return false
    }
}

export default withStyles(styles)(AddCharity);