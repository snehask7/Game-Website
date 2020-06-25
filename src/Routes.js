import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Tetris from './components/Tetris';
import Menu from './components/Menu'


const Routes = props => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/Tetris" exact component={Tetris} />
            </Switch>
        </BrowserRouter>
    )

}


export default Routes;