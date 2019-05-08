import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from "prop-types";
import { fetchCharities } from '../../Store/actions/charityAction';

const styles = theme => ({
    root: {
        color: 'red'
    },
    card: {
        marginRight: theme.spacing.unit * 2,
        overflow: 'hidden'
    }
})

class CharityTable extends Component {
    render() {
        const { classes, charities } = this.props
        console.log(charities)
        const charitiesList = charities.map((charity, index)=>(
            <TableRow key={index}>
                <TableCell>{charity.name}</TableCell>
                <TableCell>{charity.address}</TableCell>
            </TableRow>
        ))
        return (
            <Card>
            <CardContent className={classes.card}>
            <Typography component="h3" variant="h4" paragraph>Supported Charities</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Adress</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charitiesList}
                </TableBody>
            </Table>
            </CardContent>
            </Card>
        )
    }
}

CharityTable.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    charities: state.charity.items
})


export default connect(mapStateToProps, { fetchCharities })(withStyles(styles)(CharityTable));

