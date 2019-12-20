import React, { Component } from "react";
import Jumbo from "../components/Jumbo";
import Login from "../components/Login";

function Logout() {
  return (
    <div>
      <div className="mainContent">
    <Jumbo />
    <Login />
      </div>
    </div>
  );
}

export default Logout;