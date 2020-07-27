import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router'
import firebase from './base'
import 'firebase/firestore';
import defav from './img/defav.png';


const SignUp = ({ history }) => {

  const { push } = useHistory()


  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { name, email, password } = event.target.elements;
    firebase.auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((res) => {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;

        db.collection("Users").doc(user.uid).set({
          Name: name.value,
          Avatar: defav,
          friends: [],
          TetrisHighScore: 0,
          uid: user.uid
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
        alert('User added')
        push('/login')

      })
      .catch(function (error) {
        alert(error);
      });

  })

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (


    <div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
          <form onSubmit={handleSignUp} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              type="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
            <Grid container>

              <Grid item>
                <Link href='#' onClick={() => push('/login')} variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>

          </form>
        </div>
        <Box mt={8}>

        </Box>
      </Container>
    </div>
  );
};

export default withRouter(SignUp);
