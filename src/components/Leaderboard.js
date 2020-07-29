import React, { useCallback, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'firebase/firestore';
import firebase from "../base"


const Leaderboard = ({ game, score }) => {
    const [highScore, setHighScore] = useState(0)

    const [friends, setFriends] = useState([])

    const [currentUser, setCurrentUser] = useState()
    const [users, setUser] = useState([])
    const getUsers = useCallback(
        async event => {
            // event.preventDefault();

            try {
                console.log('here')
                const user = firebase.auth().currentUser;
                setCurrentUser(user.uid)
                const db = firebase.firestore();
                const userRef = db.collection('Users');
                const snapshot = await userRef.get();
                console.log(snapshot.docs)
                var userList = []
                snapshot.docs.map(doc => {
                    userList.push(doc.data())
                    // if(doc.data)
                });

                // setUser(userList)
                getFriends(userList)

            } catch (error) {
                alert(error);
            }
        },
        [score]
    );

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score)
            var values = users;
            const user = firebase.auth().currentUser;
            for (var x in values) {
                if (values[x].uid === user.uid) {
                    values[x].TetrisHighScore = score
                }
            }
            values.sort((a, b) => (a.TetrisHighScore > b.TetrisHighScore) ? -1 : ((b.TetrisHighScore > a.TetrisHighScore) ? 1 : 0));
            var pos = 1
            for (x in values) {
                if (x == 0) {
                    values[x].pos = pos;
                    pos++;
                }
                else {
                    if (values[x - 1].TetrisHighScore === values[x].TetrisHighScore) {
                        values[x].pos = values[x - 1].pos
                    }
                    else {
                        values[x].pos = pos
                        pos++;
                    }
                }

            }
            setUser(values)
        }
    }, [score],
    );

    const getFriends = (userList) => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("Users")
            .doc(user.uid)
            .get()
            .then(doc => {
                setFriends(doc.data().friends)
                var high = 0;
                console.log(doc)
                high = doc.data().TetrisHighScore;
                setHighScore(high)
                // var userList=users;
                userList.sort((a, b) => (a.TetrisHighScore > b.TetrisHighScore) ? -1 : ((b.TetrisHighScore > a.TetrisHighScore) ? 1 : 0));
                var friendList = []
                console.log(doc.data().friends, userList)
                for (var x in userList) {
                    if (doc.data().friends.includes(userList[x].uid) || userList[x].uid === user.uid) {
                        friendList.push(userList[x])
                    }
                }
                var pos = 1
                for (x in friendList) {
                    if (x == 0) {
                        friendList[x].pos = pos;
                        pos++;
                    }
                    else {
                        if (friendList[x - 1].TetrisHighScore === friendList[x].TetrisHighScore) {
                            friendList[x].pos = friendList[x - 1].pos
                        }
                        else {
                            friendList[x].pos = pos
                            pos++;
                        }
                    }

                }
                setUser(friendList)
            })
    }
    useEffect(() => {
        // getFriends()
        getUsers()
    }, [])

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
        createData('4', 305, 3.7, 67, 4.3),
        createData('5', 356, 16.0, 49, 3.9),
    ];

    const useStyles = makeStyles({
        table: {
            width: 420,
        },
    });

    const classes = useStyles();

    return (
        <>
            {
                console.log(friends)
            }
            <p className="leaderboard">{game}&nbsp;Leaderboard</p>
            <TableContainer component={Paper}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >Position</StyledTableCell>
                            <StyledTableCell >Player</StyledTableCell>
                            <StyledTableCell >High Score</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            console.log(users)
                        }
                        {users.map((row, index) => (
                            <StyledTableRow style={{
                                backgroundColor: (currentUser === row.uid ? '#86c5da' : null)
                            }}>
                                <StyledTableCell   >
                                    {row.pos}
                                </StyledTableCell>
                                <StyledTableCell >{row.Name}</StyledTableCell>
                                <StyledTableCell >{row.TetrisHighScore}</StyledTableCell>

                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default Leaderboard;