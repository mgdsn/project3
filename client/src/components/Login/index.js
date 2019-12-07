import React from "react";
import "./style.css";

function Login() {
  return (
<form className = "center">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"></input>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  
  )
  
}

export default Login;