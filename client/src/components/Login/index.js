import React, { Component } from 'react';
import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        window.location.replace("/");
        //this.props.history.push('/');
        console.log("kewl");
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
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
  </div>
  <a className="createLink" href="/create">Need to create an account? Click here!</a><br></br>
  <button type="submit" className="btn loginsub btn-primary">Submit</button>
</form>
    );
  }
}