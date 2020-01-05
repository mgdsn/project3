import React, { Component } from "react";
import "./style.css";

class PatchedDis extends Component {
  state = {
    matchArray: '',
    usersLoaded: false,
    showModal: false,
    patchDisplayName: '',
    displayName:'',
    patchEmail: '',
    message: '',
    allmessages: []
  };


  componentDidMount() {
    this.loadMatches();
    this.getDisplayName();
      }

  handleChat = (displayname, email) => {
 
    this.setState({
      showModal: true, patchDisplayName: displayname, patchEmail: email
  }, () => {
      this.timer = setInterval(()=> this.getMessages(), 1000);
  });
  }

  getDisplayName = () => {
    fetch('/api/getprofile')
    .then(res => res.json())
    .then(res => {
      if (res.display !== null) {
        this.setState({
          displayName: res.displayname,
        })
      } else {
        return
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  getMessages = () => {
    fetch('/api/getmessages', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      this.setState({allmessages: res.messages})
      console.log(this.state.allmessages)

    })
    .catch(err => {
      console.error(err);
      this.setState({apiresponse: 'Error submitting chat, please try again'})
    })    
  }



  loadMatches = () => {
    fetch('/api/getmatches')
    .then(res => res.json())
    .then(res => {
      
      if (res.status !== 404) {
        this.setState({matchArray: res})
        this.setState({usersLoaded: true})
      } else {
        this.setState({apiresponse: 'No matches found'})
      }
    })
    .catch(err => {
      this.setState({apiresponse: 'No matches found'})
    });
    
  }


  submitChat = (event) => {
    event.preventDefault();
    fetch('/api/updatechats', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({message: ''})

    })
    .catch(err => {
      console.error(err);
      this.setState({apiresponse: 'Error submitting chat, please try again'})
    })      
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }


  procClose = (event) => {
    clearInterval(this.timer)
    this.timer = null;
    this.setState({allmessages: []})
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
        <h5 className="modal-title" id="exampleModalLabel">Chat with {this.state.patchDisplayName}</h5>
        <button type="button" onClick={this.procClose} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">


      {this.state.allmessages.map(matches => (

        <p>{matches}</p>
          ))}





      </div>
      <div className="modal-footer">


      <form className="chatform" onSubmit={this.submitChat}>
  <div className="form-group">
    <input value={this.state.message} name="message" onChange={this.handleInputChange} type="text" className="form-control" id="chatmessage" aria-describedby="chatMsg" placeholder="Enter message"/>

  </div>
  <button type="submit" className="btn btn-primary sendchat">Send</button>
  <button onClick={this.procClose} type="button" className="btn btn-secondary closebtn" data-dismiss="modal">Close</button>

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