import React from "react";
import { Link } from 'react-router-dom';
import { MenuItem, MenuWrapper } from './components/styles/StyledMenu';
import Tetris from './Tetris.png'
import TicTac from './TicTac.png'
import Button from '@material-ui/core/Button';
import Nav from './Nav'
const Home = () => {

  return (
    <>

      <div className="pb-5" >
      <Nav />

        <MenuWrapper >
          <MenuItem style={{ marginRight: '100px' }} ><Link to={`/Tetris`}> <img width="300" height="250" src={Tetris} /></Link></MenuItem>
          <MenuItem ><img width="300" src={TicTac} /></MenuItem>

        </MenuWrapper>
      </div>
    </>
  )

}

export default Home;