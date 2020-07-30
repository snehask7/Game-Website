import React from "react";
import { Link } from 'react-router-dom';
import { MenuItem, MenuWrapper } from './components/styles/StyledMenu';
import Tetris from './Tetris.jpg'
import Button from '@material-ui/core/Button';
import Nav from './Nav'
import firebase from "./base"
import 'firebase/firestore';


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
        <MenuWrapper style={{ marginTop: '-10em' }} >
          <MenuItem style={{ marginRight: '100px' }} ><Link to={`/Tetris`}> <img width="295"  src={Tetris} /></Link></MenuItem>
        </MenuWrapper>
      </div>
    </>
  )

}

export default Home;