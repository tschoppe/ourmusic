import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import landing from "./landing";
import home from "./home";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #F5E2C8;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <Route exact path="/" component={landing}></Route>
      <Route path="/home" component={home}></Route>
    </Router>
  );
};

export default App;
