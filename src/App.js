import React, { Component } from 'react';
import {Router, Route } from "react-router-dom";
import Home from './Home';
import ShowMap from './ShowMap';
//import './App.css';
import history from './history';
//import Navigation from './Navbar';
import Dialog from './Dialog';


class App extends Component {
  
  render(){
  return (
    <div className="App">
    {/* <Navigation /> */}
    <Router history={history}>
            <div>
                <Route path='/' exact component={Home} />
                <Route path='/map' component={ShowMap} />
                <Route path='/form' component={Dialog} />
            </div>
        </Router>
        </div>
  );}
}


export default App;
