import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 180

const styles = theme => ({
    drawer: {
        width: drawerWidth
    },
    paper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
})

class DrawerMenu extends Component{
    render() {
        const {isDrawerOpen, classes, handleMenuItem, selectedList } = this.props;
        const drawer = (
            <List component="nav">
				<ListItem selected={selectedList == 0} onClick={handleMenuItem(0)}>
					<ListItemText primary="Tasks" />
				</ListItem>
				<ListItem selected={selectedList == 1} onClick={handleMenuItem(1)}>
					<ListItemText primary="Report" />
				</ListItem>
                <ListItem selected={selectedList == 2} onClick={handleMenuItem(2)}>
					<ListItemText primary="Charity" />
				</ListItem>
			</List>
        );
        return (
            <React.Fragment>
                <Hidden smUp>
                    <Drawer 
                        open={isDrawerOpen} 
                        variant="temporary" 
                        anchor="left" 
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer  
                        className={classes.drawer}
                        classes={{paper: classes.paper}}
                        variant="persistent" 
                        anchor="left" 
                        open
                    >
                        <div className={classes.toolbar}/>
                        {drawer}
                    </Drawer>
                </Hidden>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(DrawerMenu);