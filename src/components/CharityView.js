import React, { Component } from 'react';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Button, Card, CardContent, Typography, CardActions } from "@material-ui/core";
import PropTypes from 'prop-types';
import AddCharity from "./AddCharity";

const styles = themes => ({
    root: {
        color: 'red'
    }, 
    card: {
        marginBottom: themes.spacing.unit * 5
    }
})
class CharityView extends Component{

    render() {
        const { classes, charities, openAdd, handleCharityAdd, isAddress, isowner, tasksToPay, handlePayToCharity } = this.props
        const payCard = isowner && tasksToPay > 0;
        console.log(payCard)
        const charitiesList = charities.map((charity, index)=>(
            <TableRow key={index}>
                <TableCell>{charity.name}</TableCell>
                <TableCell>{charity.address}</TableCell>
            </TableRow>
        ))
        return(
            <React.Fragment>
                {payCard && <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p">You can send the amount of {tasksToPay} task{tasksToPay>1? "s": ""} to Charities</Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={handlePayToCharity}>Donate to Charities</Button>
                    </CardActions>
                </Card>}
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
                <AddCharity handleCharityAdd={handleCharityAdd} open={openAdd} isAddress={isAddress} />
            </React.Fragment>
        )
    }
}

CharityView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharityView);

