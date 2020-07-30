import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Nav from '../Nav'
import firebase from "../base"
import 'firebase/firestore';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const Home = () => {


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
  return (
    <>

      <div className="pb-5" >
        <Nav />
        <div style={{marginTop: '15em',marginLeft: '40%'}}>
          <FormControl >
            <h5>Create a game</h5>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Don't see a friend here? Make sure they have also added you!</FormHelperText>
          </FormControl>
        </div>

      </div>
    </>
  )

}

export default Home;