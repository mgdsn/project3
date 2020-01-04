import React, { Component } from "react";
import "./style.css";

class PatchedDis extends Component {
  state = {
    matchArray: '',
    usersLoaded: false,
    showModal: false,
    displayName: '',
    patchEmail: ''
  };


  componentDidMount() {
    this.loadMatches();
      }

  handleChat = (displayname, email) => {
    this.setState({showModal: true, displayName: displayname, patchEmail: email})
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
        <div className="card patchedcard" key={matches.email}>
        <img className="card-img-top" src={matches.photo} alt={matches.displayname}/>
        <div className="card-body">
          <h5 className="displayname">{matches.displayname}</h5>
          <h5 className="age">Age: {matches.age}</h5>
          <h5 className="gender">Gender: {matches.gender}</h5>
          <p className="about">{matches.about}</p>
          <button onClick={() => this.handleChat(matches.displayname, matches.email)} data-toggle="modal" data-target="#exampleModal" className="btn btn-primary chat">Chat</button>
        </div>
      </div>
          ))}
           { this.state.showModal &&

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Chat with {this.state.displayName}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">


      <form className="chatform">
  <div className="form-group">
    <input type="text" className="form-control" id="chatmessage" aria-describedby="chatMsg" placeholder="Enter message"/>

  </div>
  <button type="submit" className="btn btn-primary sendchat">Send</button>
  <button type="button" className="btn btn-secondary closebtn" data-dismiss="modal">Close</button>

</form>





     
        
      </div>
    </div>
  </div>
</div>
        
        
        
        
        
        
        
        
        }
      </div>
      )
    } else {
      return null;
    }
  }
}

export default PatchedDis;