import React from "react";
import "./style.css";

function CreateForm() {
  return (
<div className="container createCont">
<form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4">Email Address</label>
      <input type="email" className="form-control" id="inputEmail4" placeholder="Email"></input>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">Password</label>
      <input type="password" className="form-control" id="inputPassword4" placeholder="Password"></input>
    </div>
  </div>
  <div className="form-group">
  </div>
  <button type="submit" className="btn btn-primary">Create Account</button>
</form>
</div>
  
  )
  
}

export default CreateForm;