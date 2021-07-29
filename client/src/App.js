import React, { Component } from "react";
import Nav from "../src/components/Nav/Nav";
import Profile from "../src/pages/profile/Profile.js";
import Home from "../src/pages/home/home";
import "./App.css";

class App extends Component {
  render() {
    return <Home />;
  }
}

// class App extends Component {
//   render() {
//     return <Nav />;
//   }
// }

export default App;
