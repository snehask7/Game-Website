import React, { useState, useEffect } from "react";
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

import TextField from '@material-ui/core/TextField';

const Friends = () => {

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

    const [state, setState] = useState({
        email: '',
        name: '',
        newPwd: '',
        confirmNewPwd: '',
        avatar: defav
    })

    const { email, name, newPwd, confirmNewPwd, avatar } = state;
    const [user, setUser] = useState()
    useEffect(() => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("Users")
            .doc(user.uid)
            .get()
            .then(doc => {
                setState({ ...state, name: doc.data().Name, avatar: doc.data().Avatar })
            })

    }, [])

    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });  //spread operator
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    const saveProfile = (event) => {

        console.log(newPwd)
        const user = firebase.auth().currentUser;
        event.preventDefault()
        if (name === '') {
            console.log('1')
            alert('Name is a manditory fields!')
        }
        if (newPwd !== confirmNewPwd && newPwd !== '') {
            console.log('2')
            alert('New Passwords do not match!')
        }
        else if (newPwd === confirmNewPwd && newPwd !== '') {
            const db = firebase.firestore();
            db.collection("Users").doc(user.uid).update({
                Name: name,
                Avatar: avatar,
            })
                .then(function () {
                    user.updatePassword(newPwd).then(function () {
                        user.updateProfile({
                            displayName: name,
                            photoURL: avatar
                        }).then(function () {

                            alert('Profile Updated')
                            window.location.reload()
                        }).catch(function (error) {
                            alert(error)
                        });

                    }).catch(function (error) {
                        alert(error)
                    });
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        }
        else {
            const db = firebase.firestore();
            db.collection("Users").doc(user.uid).update({
                Name: name,
                Avatar: avatar,
            })
                .then(function () {
                    console.log("Document successfully written!");
                    alert('Profile Updated')
                    window.location.reload()
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }

    return (
        <>

            <div className="pb-5" >
                <Nav />

                <div style={{ display: 'block', marginLeft: '28%', marginRight: '20%', marginTop: '6%' }}>
                    <h1 style={{ marginLeft: '2em' }}>Friends</h1>
                    <br></br>
                    <hr></hr>
                    <h1>hi</h1>
                </div >
            </div>
        </>
    )

}

export default Friends;