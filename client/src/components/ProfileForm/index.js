import React, { Component } from 'react';
import "./style.css";

export default class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      loginerror: ''
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
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({loginerror: 'Error logging in, please try again'})
    });
  }

  render() {
    return (
<div className="container">
  <div className="container" id="surveycontainer">

    <h3><strong>Patch2 Profile</strong></h3>
    <h4>Display Name</h4>
    <input type="text" id="name" className="form-control quest" required />

    <h4>Zip Code</h4>
    <input type="number" id="zip" className="form-control quest" required />

    <h4>Patching Distance</h4>
    <select className="form-control form-control-sm quest" id="gender">
      <option value=""></option>
      <option value="1">1 Mile</option>
      <option value="5">5 Miles</option>
      <option value="10">10 Miles</option>
      <option value="50">50 Miles</option>
      <option value="300">300 Miles</option>
      <option value="Anywhere">Anywhere</option>
    </select>

    <h4>Gender Identification</h4>
    <select className="form-control form-control-sm quest" id="gender">
      <option value=""></option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <h4>Patch Gender Preference (Select all that apply)</h4>
    <label className="checkbox-inline"><input type="checkbox" value="Male"/>Male </label>
    <label className="checkbox-inline"><input type="checkbox" value="Female"/>Female </label>
    <label className="checkbox-inline"><input type="checkbox" value="Other"/>Other </label>


    <h4>Subculture Identification</h4>
    <select className="form-control form-control-sm quest" id="q3">
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
    <textarea rows="5" name="extrainfo" id="extrainfo" className="form-control form-control-sm quest" required></textarea>
    <hr/>


    <br/>
    <br/>

    <button type="submit" className="btn btn-primary btn-lg btn-block" id="submit"><i className="fa fa-check-circle"
        aria-hidden="true"></i>
      Save</button>

    <hr/>
  </div>
  </div>
    );
  }
}