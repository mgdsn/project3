import React, { Component } from 'react';
import "./style.css";

export default class Nav extends Component {

  deleteJWT = (event) => {
    event.preventDefault();
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        window.location.replace("/");
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
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Patch2</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="/">Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/patch">Patch</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/patched">Patched</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/about">About</a>
      </li>
    </ul>
    <button onClick={this.deleteJWT} className="logout-btn">Log out</button>
  </div>
</nav>
    );
  }
}