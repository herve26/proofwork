import React, { Component } from 'react';
import { withStyles, Dialog, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";

const styles = themes => ({
    root: {
        color: 'red'
    }
})

class AddCharity extends Component {
    state = {
        name: '',
        address: ''
    }

    render() {
        const { classes, open } = this.props
        return (
            <Dialog open={open} >
                <DialogContent>
                    <TextField
                        label="Name of Organization"
                        type="text"
                        id="charity_name"
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <TextField
                        label="Ethereum Address of Organization"
                        type="text"
                        id="chairty_address"
                        fullWidth
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseAdd} color="primary">
                        Add Charity
                    </Button>
                    <Button onClick={this.handleCloseCancel} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
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