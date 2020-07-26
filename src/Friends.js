import React, { useState, useCallback, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MenuItem, MenuWrapper } from './components/styles/StyledMenu';
import Tetris from './Tetris.png'
import TicTac from './TicTac.png'
import Button from '@material-ui/core/Button';
import Nav from './Nav'
import firebase from "./base"
import 'firebase/firestore';
import defav from './img/defav.png';
import av1 from './img/av1.png'
import av2 from './img/av2.png'
import av3 from './img/av3.png'
import av4 from './img/av4.png'
import av5 from './img/av5.png'
import av6 from './img/av6.png'
import av7 from './img/av7.png'
import av8 from './img/av8.png'
import av9 from './img/av9.png'
import av10 from './img/av10.png'
import av11 from './img/av11.png'
import av12 from './img/av12.png'
import av13 from './img/av13.png'
import av14 from './img/av14.png'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import TextField from '@material-ui/core/TextField';

const Friends = ({ history }) => {

    // const readData = () => {
    //   const db = firebase.firestore();
    //   db.collection("Users").doc("new").set({
    //     userID: "123",
    //     tetrisScore: "123",
    //   })
    //     .then(function () {
    //       console.log("Document successfully written!");
    //     })
    //     .catch(function (error) {
    //       console.error("Error writing document: ", error);
    //     });
    // }


    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 700,
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
    }));

    const classes = useStyles();

    const [state, setState] = useState({
        friends: [],
        name: ''
    })

    const { name, friends } = state;
    const [users, setUser] = useState()

    const getUsers = useCallback(
        async event => {
            // event.preventDefault();

            try {
                const user = firebase.auth().currentUser;
                const db = firebase.firestore();
                const userRef = db.collection('Users');
                const snapshot = await userRef.get();
                console.log(snapshot.docs)
                setUser(snapshot.docs)
                snapshot.docs.map(doc => {
                    console.log(doc.id, '=>', doc.data());

                });

            } catch (error) {
                alert(error);
            }
        },
        [name]
    );



    // const handleChange = (name) => (event) => {
    //     setState({ ...state, [name]: event.target.value });  //spread operator
    // }

    // const saveProfile = (event) => {

    //     console.log(newPwd)
    //     const user = firebase.auth().currentUser;
    //     event.preventDefault()
    //     if (name === '') {
    //         console.log('1')
    //         alert('Name is a manditory fields!')
    //     }
    //     if (newPwd !== confirmNewPwd && newPwd !== '') {
    //         console.log('2')
    //         alert('New Passwords do not match!')
    //     }
    //     else if (newPwd === confirmNewPwd && newPwd !== '') {
    //         const db = firebase.firestore();
    //         db.collection("Users").doc(user.uid).update({
    //             Name: name,
    //             Avatar: avatar,
    //         })
    //             .then(function () {
    //                 user.updatePassword(newPwd).then(function () {
    //                     user.updateProfile({
    //                         displayName: name,
    //                         photoURL: avatar
    //                     }).then(function () {

    //                         alert('Profile Updated')
    //                         window.location.reload()
    //                     }).catch(function (error) {
    //                         alert(error)
    //                     });

    //                 }).catch(function (error) {
    //                     alert(error)
    //                 });
    //             })
    //             .catch(function (error) {
    //                 console.error("Error writing document: ", error);
    //             });

    //     }
    //     else {
    //         const db = firebase.firestore();
    //         db.collection("Users").doc(user.uid).update({
    //             Name: name,
    //             Avatar: avatar,
    //         })
    //             .then(function () {
    //                 console.log("Document successfully written!");
    //                 alert('Profile Updated')
    //                 window.location.reload()
    //             })
    //             .catch(function (error) {
    //                 console.error("Error writing document: ", error);
    //             });
    //     }
    // }


    const handleChange = (name) => (event) => {
        if (name === '')
            getUsers()
        setState({ ...state, [name]: event.target.value });  //spread operator

    }

    return (
        <>

            <div className="pb-5" >
                <Nav />

                <div style={{ display: 'block', marginLeft: '28%', marginRight: '20%', marginTop: '6%' }}>
                    <h1 style={{ marginLeft: '2em' }}>Friends</h1>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <Grid container >
                        <Grid item xs={8}>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <List className={classes.root} subheader={<li />}>
                                <ListSubheader><h3>Your Friends</h3></ListSubheader>
                                {
                                    // friends.map((friend, i) => (
                                    //     return(
                                    //         <ListItemText primary={`Item ${item}`} />
                                    //     )
                                    // ))
                                }

                            </List>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={name}
                                onChange={handleChange('name')}
                            />
                            <br></br>
                            <List className={classes.root} subheader={<li />}>
                                <ListSubheader><h3>Find Friends</h3></ListSubheader>
                                {/* {
                                    users.map((friend) => (
                                        return(
                                            <ListItemText primary={friend.Name} />
                                        )
                                    ))
                                } */}

                            </List>
                        </Grid>

                    </Grid>
                </div >
            </div>
        </>
    )

}

export default Friends;