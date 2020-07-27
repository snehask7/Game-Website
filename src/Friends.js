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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';

const Friends = ({ history }) => {

    const currentUser = firebase.auth().currentUser;

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

    //list of all users in the find friends list
    const [users, setUser] = useState([])

    //list of users that match the search name
    const [searchList, setSearchList] = useState([])


    const getUsers = useCallback(
        async event => {
            // event.preventDefault();

            try {
                console.log('here')

                const user = firebase.auth().currentUser;
                const db = firebase.firestore();
                const userRef = db.collection('Users');
                const snapshot = await userRef.get();
                console.log(snapshot.docs)
                var userList = []
                snapshot.docs.map(doc => {
                    userList.push(doc.data())
                    // if(doc.data)
                });
                setUser(userList)

            } catch (error) {
                alert(error);
            }
        },
        [name]
    );

    useEffect(() => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("Users")
            .doc(user.uid)
            .get()
            .then(doc => {
                setState({ ...state, friends: doc.data().friends })
                getUsers()
            })

    }, [])

    const handleChange = (label) => (event) => {
        if (name === '')
            getUsers()
        setState({ ...state, [label]: event.target.value });  //spread operator
        findFriends(event.target.value)

    }
    const findFriends = (searchName) => {
        // console.log(searchName)
        var searchResults = []
        for (var i = 0; i < users.length; i++) {
            console.log(users[i])
            if (users[i].Name.toLowerCase().includes(searchName.toLowerCase())) {
                searchResults.push(users[i])
            }
        }
        setSearchList(searchResults)
    }

    const addFriend = (userID) => {
        console.log('add')
        var allFriends = friends;
        allFriends.push(userID);
        setState({ ...state, friends: allFriends })
        console.log(allFriends)
        const db = firebase.firestore();
        db.collection("Users").doc(currentUser.uid).update({
            friends: allFriends
        })
            .then((response) => {
                alert('Friend Added!')
                window.location.reload()
            })
    }

    const removeFriend = (userID) => {
        console.log('add')
        var allFriends = friends;
        console.log(allFriends)
        console.log(allFriends.indexOf(userID))
        allFriends.splice(allFriends.indexOf(userID), 1);
        setState({ ...state, friends: allFriends })
        const db = firebase.firestore();
        db.collection("Users").doc(currentUser.uid).update({
            friends: allFriends
        })
            .then((response) => {
                alert('Friend removed!')
                window.location.reload()
            })
    }

    const clearFriend = (userID) => {

        const db = firebase.firestore();
        db.collection("Users").doc(currentUser.uid).set({
            Name: 'Sneha',
            Avatar: defav,
            friends: [],
            TetrisHighScore: 0,
            uid: currentUser.uid
        })
            .then((response) => {
                alert('Friend Request Send!')
                window.location.reload()
            })
    }
    return (
        <>

            <div className="pb-5" >
                <Nav />

                <div style={{ display: 'block', marginLeft: '28%', marginRight: '20%', marginTop: '6%' }}>
                    <h1 className="friendsFont" >Friends</h1>

                    <hr ></hr>
                    <br></br>
                    {/* <button onClick={() => clearFriend()}>Clear</button> */}
                    <Grid container spacing={3} >
                        <Grid container spacing={3}>
                            <h3 className="montserrat" style={{ marginTop: '3%', marginLeft: '2%',marginRight: '2%' }}>Find Friends&nbsp;<SearchIcon /></h3>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="name"
                                placeholder="Search"
                                autoComplete='off'
                                size="small"
                                value={name}
                                onChange={handleChange('name')}
                                style={{marginTop: '3%'}}
                            />
                        </Grid>
                        <br></br><br></br><br></br>
                        <br></br>
                        <Grid container spacing={3}>
                            {

                                searchList.map((user) => {
                                    if (user.Name !== 'Guest' && user.uid !== currentUser.uid && !friends.includes(user.uid))
                                        return (
                                            <Grid item xs={6} sm={4}>

                                                <Card style={{ width: '20em' }}>
                                                    <ListItem>
                                                        <img style={{ marginRight: '1em', marginLeft: '1em' }} width="50" src={user.Avatar}></img>
                                                        <h4>{user.Name}</h4>
                                                        <Button onClick={() => addFriend(user.uid)}><PersonAddIcon style={{ color: "blue" }} /></Button>
                                                    </ListItem>
                                                </Card>
                                            </Grid>

                                        )
                                })
                            }
                        </Grid>
                    </Grid>
                    <br></br>
                    <hr></hr>
                    <Grid container spacing={3} >

                        <Grid container spacing={3}>

                            <h3 className="montserrat" style={{ marginTop: '3%', marginLeft: '2%' }}>Your Friends</h3>
                        </Grid>
                        <br></br><br></br><br></br>
                        <Grid container spacing={3}>

                            {

                                users.map((user) => {
                                    if (friends.includes(user.uid))
                                        return (
                                            <Grid item xs={6} sm={4}>
                                                <Card style={{ width: '20em' }}>
                                                    <ListItem>
                                                        <img style={{ marginRight: '1em', marginLeft: '1em' }} width="50" src={user.Avatar}></img>
                                                        <h4>{user.Name}</h4>
                                                        <Button onClick={() => removeFriend(user.uid)}><ClearIcon style={{ color: "red" }} /></Button>
                                                    </ListItem>
                                                </Card>
                                            </Grid>
                                        )
                                })
                            }
                        </Grid>
                    </Grid>

                </div >
            </div>
        </>
    )

}

export default Friends;