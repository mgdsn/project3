import React, { Component } from 'react';
import "./style.css";
require("dotenv").config();

//const apikey = process.env.REACT_APP_ZIPAPIKEY;

export default class ProfileForm extends Component {
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

    componentWillMount() {
      fetch('/api/getprofile')
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

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  toggleMale(event) {
    this.setState({malematch: !this.state.malematch});
 }

  toggleFemale(event) {
    this.setState({femalematch: !this.state.femalematch});
  }

  toggleOther(event) {
    this.setState({othermatch: !this.state.othermatch});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const entzip = this.state.zip;
    fetch('https://www.zipcodeapi.com/rest/js-lqUSl36ZgsfowhwsX9xIhCleRx71J0eumdCiRIsGyz5x4nxjpjLtUdbZ803RpoDZ/info.json/' + entzip + '/radians')
    .then(res => {
      if (res.status === 200) {

        fetch('/api/updateprofile', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.text())
        .then(res => {this.setState({apiresponse: res})})
        .catch(err => {
          console.error(err);
          this.setState({apiresponse: 'Error updating profile, please try again'})
        })      
      } else {
        this.setState({apiresponse: 'Error, zip code not found. Please check zip and try again'})
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({loginerror: 'Error updating profile, please try again'})
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
    <h3><strong>Patch2 Profile</strong></h3>
    { this.state.photo &&
    <img className="userphoto" src={this.state.photo} alt="User photo"></img>}
    <h4>Display Name</h4>
    <input type="text" id="name" className="form-control quest" required 
    name="displayname"
    value={this.state.displayname}
    onChange={this.handleInputChange}
    />

    <h4>Zip Code</h4>
    <input type="number" id="zip" className="form-control quest" required 
    name="zip"
    value={this.state.zip}
    onChange={this.handleInputChange}
    />

    <h4>Link to photo</h4>
    <input type="text" id="photo" className="form-control quest" required 
    name="photo"
    value={this.state.photo}
    onChange={this.handleInputChange}/>

    <h4>Patching Distance (in Miles)</h4>
    <input type="number" id="distance" className="form-control quest" required 
    name="distance"
    value={this.state.distance}
    onChange={this.handleInputChange}/>

    <h4>Gender Identification</h4>
    <select className="form-control form-control-sm quest" id="gender"
    name="gender"
    value={this.state.gender}
    onChange={this.handleInputChange}>
      <option value=""></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <h4>Patch Gender Preference</h4>
    <label>Male<select className="form-control form-control-sm quest" id="malematch"
    name="malematch"
    value={this.state.malematch}
    onChange={this.handleInputChange}>
      <option value=""></option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select></label>
    <label>Female<select className="form-control form-control-sm quest" id="femalematch"
    name="femalematch"
    value={this.state.femalematch}
    onChange={this.handleInputChange}>
      <option value=""></option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select></label>
    <label>Other<select className="form-control form-control-sm quest" id="othermatch"
    name="othermatch"
    value={this.state.othermatch}
    onChange={this.handleInputChange}>
      <option value=""></option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select></label>

    <h4>Age</h4>
    <input type="number" id="age" className="form-control quest" required
    name="age"
    value={this.state.age}
    onChange={this.handleInputChange}/>

    <h4>Patch Age Range</h4>
    <input type="number" id="minage" className="form-control quest" required
    name="minage"
    value={this.state.minage}
    onChange={this.handleInputChange} /> - 
    <input type="number" id="maxage" className="form-control quest" required
    name="maxage"
    value={this.state.maxage}
    onChange={this.handleInputChange}/>

    <h4>Subculture Identification</h4>
    <select className="form-control form-control-sm quest" id="subculture"
      name="subculture"
      value={this.state.subculture}
      onChange={this.handleInputChange}>
      <option value=""></option>
      <option value="Afrofuturism">Afrofuturism</option>
      <option value="Anarchopunk">Anarcho-punk</option>
      <option value="Anime">Anime</option>
      <option value="BDSM">BDSM</option>
      <option value="Beatgeneration">Beat Generation</option>
      <option value="Bicyclists">Bicyclists</option>
      <option value="Biopunk">Biopunk</option>
      <option value="Boardgamer">Board Gamer</option>
      <option value="Bodybuilding">Bodybuilding</option>
      <option value="Bronies">Bronies</option>
      <option value="Cosplayers">Cosplayers</option>
      <option value="Cybergoth">Cybergoth</option>
      <option value="Deadhead">Deadhead</option>
      <option value="Drag">Drag</option>
      <option value="Emo">Emo</option>
      <option value="Furry">Furry</option>
      <option value="Futurism">Futurism</option>
      <option value="Gabber">Gabber</option>
      <option value="Goth">Goth</option>
      <option value="Grunge">Grunge</option>
      <option value="Geek">Geek</option>
      <option value="Hacker">Hacker</option>
      <option value="Hardcorepunk">Hardcore Punk</option>
      <option value="Hiphop">Hip-hop</option>
      <option value="Hippy">Hippy</option>
      <option value="Indsutrial">Industrial</option>
      <option value="Juggalo">Juggalo</option>
      <option value="Kpop">K-pop</option>
      <option value="Larper">LARPer</option>
      <option value="Metal">Metal</option>
      <option value="Mod">MOD</option>
      <option value="Motorcycles">Motorcycles</option>
      <option value="Nudist">Nudist</option>
      <option value="Phishphan">Phish Phan</option>
      <option value="Prepper">Prepper</option>
      <option value="Psychdelia">Psychedelia</option>
      <option value="Punk">Punk</option>
      <option value="Rasta">Rasta</option>
      <option value="Raver">Raver</option>
      <option value="Rockabilly">Rockabilly</option>
      <option value="Roleplayinggamer">Role-playing gamer</option>
      <option value="Scififandom">Sci-fi Fandom</option>
      <option value="Skater">Skater</option>
      <option value="Steampunk">Steampunk</option>
      <option value="Straightedge">Straight Edge</option>
      <option value="Swinger">Swinger</option>
      <option value="Trekkie">Trekkie</option>
      <option value="Vampire">Vampire</option>
      <option value="Videogamer">Video Gamer</option>
    </select>

    <h4>About Me</h4>
    <textarea rows="5" name="extrainfo" id="about" className="form-control form-control-sm quest" required
    name="about"
    value={this.state.about}
    onChange={this.handleInputChange}></textarea>
    <hr/>


    <br/>
    <br/>
    { this.state.apiresponse &&
  <h3 className="error"> {this.state.apiresponse } </h3> }
    <button type="submit" className="btn btn-primary btn-lg btn-block" id="submit"><i className="fa fa-check-circle"
        aria-hidden="true"></i>
      Save</button>

    <hr/>
  </form>
    );
  }
}