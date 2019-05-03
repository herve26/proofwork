import React, { Component } from 'react';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Typography, Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";

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

export default withStyles(styles)(CharityTable);

