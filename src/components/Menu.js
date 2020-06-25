import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MenuItem, MenuWrapper } from './styles/StyledMenu';
import { Background } from './styles/StyledBackground';
import Tetris from '../Tetris.png'
import TicTac from '../TicTac.png'
import Nav from './Nav'

const Menu = () => {

    return (
        <>
            {/* <Nav /> */}
            <Background>
                <MenuWrapper >
                    <MenuItem ><Link to={`/Tetris`}> <img width="300" height="250" src={Tetris} /></Link></MenuItem>
                    <MenuItem ><img width="300" src={TicTac} /></MenuItem>

                </MenuWrapper>

            </Background>
        </>
    )

}

export default Menu;
