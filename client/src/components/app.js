import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import landing from "./landing";
import home from "./home";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={landing}></Route>
        <Route path="/home" component={home}></Route>
      </div>
    </Router>
  );
};

export default App;
