import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Jumbo from "./components/Jumbo";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div className="mainContent">
    <Nav />
    <Jumbo />
    <Login />
      </div>
    <Footer />
    </div>
  );
}

export default App;
