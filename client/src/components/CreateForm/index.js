import React, { Component } from 'react';
import "./style.css";


export default class CreateForm extends Component {
  state = {
    email : '',
    password: '',
    apiresponse: '',
    loginURL: false
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(res => {
      console.log(res);
      if (res === "You are now registered."){
        this.setState({loginURL: true})
      }
      this.setState({apiresponse: res})})
    .catch(err => {
      console.error(err);
      this.setState({apiresponse: 'Error logging in, please try again'})
    })
  }


  render() {
    const loginURL = this.state.loginURL;
    let url;

    if (loginURL){
      url = <p>Please <a href="/login">Log in</a></p>;
    }

    return (
<form className="center" onSubmit={this.onSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email Address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    name="email"
    placeholder="Enter email"
    value={this.state.email}
    onChange={this.handleInputChange}
    required
    ></input>
    <small id="emailHelp" className="form-text text-muted"></small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
    name="password"
    placeholder="Enter password"
    value={this.state.password}
    onChange={this.handleInputChange}
    required
    ></input>
      { this.state.apiresponse &&
  <h3 className="error"> {this.state.apiresponse } {url} </h3> }
  </div>
  <button type="submit" className="btn loginsub btn-primary">Create Account</button>
</form>
    );
  }
}