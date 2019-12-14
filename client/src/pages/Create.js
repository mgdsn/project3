import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import "./App.css";
import Nav from "../components/Nav";
import Jumbo from "../components/Jumbo";
import Login from "../components/Login";
import CreateForm from "../components/CreateForm";

function Create() {
  return (
    <div>
    <Jumbo />
    <CreateForm />
    </div>
  );
}

export default Create;