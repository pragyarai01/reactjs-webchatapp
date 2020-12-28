import React, { Component } from 'react';
import {Router, Route } from "react-router-dom";
import Home from './Home';
import ShowMap from './ShowMap';
//import logo from './logo.svg';
//import './App.css';
import history from './history';
//import Navigation from './Navbar';
//import Mileage from './Mileage';
import Dialog from './Dialog';

// const getCurrentPath = () => {
//   const path = document.location.pathname
//   return path.substring(path.lastIndexOf('/'))
// }
class App extends Component {
  // state = {
  //   route: getCurrentPath()
  // }
  // componentDidMount() {
  //   window.onpopstate = () => {
  //     this.setState({route: getCurrentPath()})
  //   }
  // }
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
