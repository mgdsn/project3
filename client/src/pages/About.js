import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import "./App.css";
import Nav from "../components/Nav";
import Jumbo from "../components/Jumbo";
import Login from "../components/Login";
import AboutContent from "../components/AboutContent";

function About() {
  return (
    <div>
      <Jumbo />
      <AboutContent />
    </div>
  );
}

export default About;