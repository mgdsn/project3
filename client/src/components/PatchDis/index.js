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
    apiresponse: '',
    _id: '',
  };

  componentDidMount() {
this.loadNextPatch();
    
  }

loadNextPatch = () => {
    fetch('/api/getpatch')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.status !== 404) {
        this.setState({
          useremail: res.email,
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
        this.setState({apiresponse: 'No new patches, check back later'})
        
      }
    })
    .catch(err => {
      this.setState({apiresponse: 'No new patches, check back later',
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
      _id: '',    
    })

    });
    
  }

  procDislike = () => {
    console.log(this.state.useremail)
    fetch('/api/updatedislike', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.loadNextPatch();
    }).catch(err => {
      console.error(err);
      this.setState({apiresponse: 'Error processing'})
    })
  }

  render() {
    return (
      <div>
      { this.state.apiresponse &&
        <h3 className="error"> {this.state.apiresponse } </h3> }
{ this.state.displayname &&
<div className="card">
  <img className="card-img-top" src={this.state.photo} alt={this.state.displayname}/>
  <div className="card-body">
    <h5 className="displayname">{this.state.displayname}</h5>
    <h5 className="age">Age: {this.state.age}</h5>
    <h5 className="gender">Gender: {this.state.gender}</h5>
    <p className="about">{this.state.about}</p>
    <button onClick={this.procDislike} className="btn btn-primary dislike">Dislike</button>
    <button onClick={this.procLike}className="btn btn-primary like">Like</button>
  </div>
</div>}
</div> 

    );
  }
}