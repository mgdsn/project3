import React from "react";
import Jumbo from "../components/Jumbo";

function Patched() {
  return (
    <div>
      <div className="mainContent">
    <Jumbo />
    this is patched page
      </div>
    </div>
  );
}

export default Patched;