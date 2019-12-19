import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Loginpage from "./pages/Loginpage";
import Create from "./pages/Create";
import About from "./pages/About";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import withAuth from './withAuth';


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={withAuth(Profile)} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Loginpage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
