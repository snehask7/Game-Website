import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from "./base";
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {

    var user = firebase.auth().currentUser;
    console.log(user)
    var email = user.displayName;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ marginTop: '-10px', marginLeft: '-9px' }}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}><h3>Menu</h3></Link>
                    </Typography>
                    <Typography variant="h6" >
                        <h3>Welcome {email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    </Typography>
                    <Typography>
                        <Link to={`/login`} style={{ color: 'white', textDecoration: 'none' }}> <h3>Sign Out</h3></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}