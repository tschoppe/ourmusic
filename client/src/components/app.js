import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import landing from "./landing";
import home from "./home";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={landing}></Route>
      <Route path="/home" component={home}></Route>
    </Router>
  );
};

export default App;
