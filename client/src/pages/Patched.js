import React from "react";
import Jumbo from "../components/Jumbo";
import PatchedDis from "../components/PatchedDis";

function Patched() {
  return (
    <div>
      <div className="mainContent">
    <Jumbo />
    <PatchedDis />
      </div>
    </div>
  );
}

export default Patched;