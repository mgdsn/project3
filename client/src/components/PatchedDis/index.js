import React, { Component } from "react";
import "./style.css";

class PatchedDis extends Component {
  state = {
    matchArray: '',
    usersLoaded: false
  };

  componentDidMount() {
    this.loadMatches();
      }


  loadMatches = () => {
    fetch('/api/getmatches')
    .then(res => res.json())
    .then(res => {
      
        console.log(res)
      if (res.status !== 404) {
        this.setState({matchArray: res})
        this.setState({usersLoaded: true})

    
   
      } else {
        console.log("butts");
        
      }
    })
    .catch(err => {
 

    });
    
  }

  render() {

    if ( this.state.usersLoaded ) {
      return (
        <div className= "mainDiv">
        { this.state.apiresponse &&
        <h3 className="error"> {this.state.apiresponse } </h3> }
        {this.state.matchArray.map(matches => (
        <div className="card patchedcard" key={matches._id}>
        <img className="card-img-top" src={matches.photo} alt={matches.displayname}/>
        <div className="card-body">
          <h5 className="displayname">{matches.displayname}</h5>
          <h5 className="age">Age: {matches.age}</h5>
          <h5 className="gender">Gender: {matches.gender}</h5>
          <p className="about">{matches.about}</p>
          <button onClick={this.procLike} className="btn btn-primary chat">Chat</button>
        </div>
      </div>
          ))}
      </div>
      )
    } else {
      return null;
    }
  }
}

export default PatchedDis;