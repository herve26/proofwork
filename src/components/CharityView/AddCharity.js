import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { addCharity } from '../../Store/actions/charityAction';


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
        if(this.isValidInput(this.state)){
            this.props.addCharity(this.state)
            this.setState({name: '', address: ''})
        }
    }

    isValidInput = (charity) => {
        if(charity.name && this.props.web3.utils.isAddress(charity.address))
            return true
        return false
    }
}

const mapStateToProps = state => ({
    web3: state.web3.instance
})

export default connect(mapStateToProps, { addCharity })(withStyles(styles)(AddCharity));