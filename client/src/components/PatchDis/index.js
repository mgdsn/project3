import React, { Component } from 'react';
import "./style.css";

export default class PatchDis extends Component {
  state = {
    displayname: '',
    zip: '',
    photo: '',
    distance: '',
    age: '',
    minage: '',
    maxage: '',
    gender: '',
    malematch: false,
    femalematch: false,
    othermatch: false,
    subculture: '',
    about: '',
    apiresponse: ''
  };

  componentDidMount() {
this.loadNextPatch();
    
  }

loadNextPatch = () => {
    fetch('/api/getpatch')
    .then(res => res.json())
    .then(res => {
      if (res.display !== null) {
        this.setState({
          zip: res.zip,
          displayname: res.displayname,
          photo: res.photo,
          distance: res.distance,
          age: res.age,
          minage: res.minage,
          maxage: res.maxage,
          gender: res.gender,
          malematch: res.malematch,
          femalematch: res.femalematch,
          othermatch: res.othermatch,
          subculture: res.subculture,
          about: res.about
        })
   
      } else {
        return
      }
    })
    .catch(err => {
      console.error(err);
    });
    
  }

  render() {
    return (
<div className="card">
  <img className="card-img-top" src={this.state.photo} alt={this.state.displayname}/>
  <div className="card-body">
    <h5 className="displayname">{this.state.displayname}</h5>
    <h5 className="age">Age: {this.state.age}</h5>
    <h5 className="gender">Gender: {this.state.gender}</h5>
    <p className="about">{this.state.about}</p>
    <button className="btn btn-primary dislike">Dislike</button>
    <button className="btn btn-primary like">Like</button>
  </div>
</div>
    );
  }
}