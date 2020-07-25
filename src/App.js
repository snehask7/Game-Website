import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Tetris from './components/Tetris';
import Profile from './profile'
import Friends from './Friends'

const App = () => {
  return (
    <AuthProvider>
      <Router >
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/Tetris" exact component={Tetris} />
          <Route path="/profile" exact component={Profile}/>
          <Route path="/Friends" exact component={Friends}/>


        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
