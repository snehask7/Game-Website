import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import firebase from "./base";
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from 'react-icons-kit'
import { thLarge } from 'react-icons-kit/fa/thLarge'
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import 'firebase/firestore';
import { GiTicTacToe } from "react-icons/gi";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


export default function ButtonAppBar() {

    var user = firebase.auth().currentUser;
    const [name, setName] = useState('')
    const db = firebase.firestore();
    db.collection("Users")
        .doc(user.uid)
        .get()
        .then(doc => {
            setName(doc.data().Name)
        })


    //     return (
    //         <div className={classes.root}>
    //             <AppBar position="static" style={{ marginTop: '-10px', marginLeft: '-9px' }}>
    //                 <Toolbar>
    //                     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    //                     </IconButton>
    //                     <Typography variant="h6" className={classes.title}>
    //                         <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}><h3>Menu</h3></Link>
    //                     </Typography>
    //                     <Typography variant="h6" >
    //                         <h3>Welcome {email} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
    //                     </Typography>
    //                     <Typography>
    //                         <Link to={`/login`} style={{ color: 'white', textDecoration: 'none' }}> <h3>Sign Out</h3></Link>
    //                     </Typography>
    //                 </Toolbar>
    //             </AppBar>
    //         </div>
    //     );
    // }
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>

                        <h3> Game Nation&nbsp;<SportsEsportsIcon fontSize="large" /></h3>
                    </Typography>
                    <Typography style={{ position: 'absolute', right: 170 }} variant="h6" >
                        <h3>Welcome {name} </h3>
                    </Typography>
                    <Typography style={{ position: 'absolute', right: 10 }}>
                        <Link to={`/login`} style={{ color: 'white', textDecoration: 'none' }}> <h3>Sign Out</h3></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Link to={`/`} style={{ textDecoration: 'none' }}> <h3 style={{ marginLeft: '1em' }}>Menu</h3></Link>

                    <IconButton style={{ marginLeft: '3em' }} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to={`/Tetris`}>
                        <ListItem button >
                            <Icon style={{ color: '#f5e942', marginRight: '1em', }} size={25} icon={thLarge} />
                            <ListItemText primary='Tetris' />
                        </ListItem>
                    </Link>

                    {/* {
                        name === "Guest" ?
                            null :
                            <Link to={`/TicTacToeMenu`}>
                                <ListItem button >
                                    <GiTicTacToe style={{ marginRight: '1em', }} size={30} />
                                    <ListItemText primary='TicTacToe' />
                                </ListItem>
                            </Link>

                    } */}

                </List>
                <Divider />

                {
                    name === "Guest" ?
                        null :
                        <>
                            <Link to={`/Friends`}>
                                <List>
                                    <ListItem button >
                                        <GroupIcon />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <ListItemText primary='Friends' />
                                    </ListItem>
                                </List>
                            </Link>
                            <Link to={`/Profile`}>

                                <List>
                                    <ListItem button >
                                        <AccountCircleIcon />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <ListItemText primary='Your Profile' />
                                    </ListItem>
                                </List>
                            </Link>
                        </>

                }


            </Drawer>
        </div>
    );
}