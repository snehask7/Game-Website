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

const Profile = () => {

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
        if (!user.photoURL)
            setState({ ...state, email: user.email, name: user.displayName, avatar: defav })
        else
            setState({ ...state, email: user.email, name: user.displayName, avatar: user.photoURL })


        console.log(user)

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
        if (name === '' || email === '') {
            console.log('1')
            alert('Name and Email are manditory fields!')
        }
        if (newPwd !== confirmNewPwd && newPwd !== '') {
            console.log('2')
            alert('New Passwords do not match!')
        }
        else if (newPwd === confirmNewPwd && newPwd !== '') {
            user.updatePassword(newPwd).then(function () {
                user.updateProfile({
                    displayName: name,
                    email: email,
                    photoURL: avatar
                }).then(function () {
                    alert('Profile Updated')
                }).catch(function (error) {
                    alert(error)
                });
                alert('Profile Updated')
                window.location.reload()
            }).catch(function (error) {
                alert(error)
            });
        }
        else {
            user.updateProfile({
                displayName: name,
                email: email,
                photoURL: avatar
            }).then(function () {
                alert('Profile Updated')
                window.location.reload()
            }).catch(function (error) {
                alert(error)
            });
        }
    }

    return (
        <>

            <div className="pb-5" >
                <Nav />

                <div style={{ display: 'block', marginLeft: '28%', marginRight: '20%', marginTop: '6%' }}>
                    <h1 style={{ marginLeft: '2em' }}>Profile</h1>
                    <hr></hr>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <img width="200" style={{ display: 'block', marginLeft: '10%', marginRight: 'auto' }} src={avatar}></img>
                        </Grid>
                        <Grid item xs={4}>
                            <table >
                                <tr>
                                    <th colspan="5"><h5>Choose Avatar</h5></th>
                                </tr>
                                <tr>
                                    <th><br></br></th>
                                </tr>
                                <tr>
                                    <th><img onClick={() => setState({ ...state, avatar: defav })} width="60" src={defav} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av2 })} width="60" src={av2} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av3 })} width="60" src={av3} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av4 })} width="60" src={av4} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av5 })} width="60" src={av5} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av6 })} width="60" src={av6} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av7 })} width="60" src={av7} /></th>
                                </tr>
                                <tr>
                                    <th><img onClick={() => setState({ ...state, avatar: av8 })} width="60" src={av8} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av9 })} width="60" src={av9} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av10 })} width="60" src={av10} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av11 })} width="60" src={av11} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av12 })} width="60" src={av12} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av13 })} width="60" src={av13} /></th>
                                    <th><img onClick={() => setState({ ...state, avatar: av14 })} width="60" src={av14} /></th>
                                </tr>
                            </table>
                        </Grid>
                    </Grid>
                    <br></br>
                    <div style={{ marginLeft: '4%' }}>
                        <form onSubmit={saveProfile} className={classes.form} noValidate>
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={email}
                                onChange={handleChange('email')}
                            />
                            <hr></hr>
                            <h5>Change Password</h5>
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={currentPwd}
                                onChange={handleChange('currentPwd')}

                            /> */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="New Password"
                                type="password"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={newPwd}
                                onChange={handleChange('newPwd')}

                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                autoComplete="current-password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={confirmNewPwd}
                                onChange={handleChange('confirmNewPwd')}

                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            >
                                Save
          </Button>
                        </form>
                    </div>
                </div>
                {/* <MenuWrapper style={{marginTop: '-10em'}} >
            <MenuItem style={{ marginRight: '100px' }} ><Link to={`/Tetris`}> <img width="300" height="250" src={Tetris} /></Link></MenuItem>
            <MenuItem ><img width="300" src={TicTac} /></MenuItem>
  
          </MenuWrapper> */}
            </div >
        </>
    )

}

export default Profile;