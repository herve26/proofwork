import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PropTypes from 'prop-types';
import AddCharity from "./AddCharity";
import CharityTable from "./CharityTable";
import CharityPay from "./CharityPay";

const styles = themes => ({
    root: {
        color: 'red'
    }, 
    card: {
        marginBottom: themes.spacing.unit * 5
    },
    modalCard: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        display: 'flex',
    },
    cardOwner: {
        borderRadius: '0px'
    }
})
class CharityView extends Component{

    render() {
        const { classes, charities, openAdd, handleClose, handleCharityAdd, isAddress, isowner, tasksToPay, handlePayToCharity } = this.props
        const payCard = isowner && tasksToPay >= 0;
        // console.log(openAdd)
        
        return(
            
                <Modal open={openAdd}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <Card className={classes.modalCard}>
                            <CharityTable charities={charities}/>
                            <Card className={classes.cardOwner}>
                                <CharityPay tasksToPay={tasksToPay} payCard={payCard} handleClick={handlePayToCharity} />
                                <AddCharity handleCharityAdd={handleCharityAdd} open={false} isAddress={isAddress} isowner={isowner} />
                            </Card>
                        </Card>
                    </ClickAwayListener>
                </Modal>
        )
    }
}

CharityView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharityView);

