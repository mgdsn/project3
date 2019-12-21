import React from "react";
import Jumbo from "../components/Jumbo";
import Login from "../components/Login";

function Home() {
  return (
    <div>
      <div className="mainContent">
    <Jumbo />
    <Login />
      </div>
    </div>
  );
}

export default Home;
