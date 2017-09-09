import React, { Component } from 'react';
import logo from './cupid.svg';
import LoginComponent from './LoginComponent';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isAutho: false, facebookUserId: 0, userSettings: {}};
    this.updatePermission = this.updatePermission.bind(this);
    this.fetchUserSettings = this.fetchUserSettings.bind(this);
  }

  updatePermission(isAutho, facebookUserId){
    let self = this;
    this.setState({isAutho: isAutho});
    if(facebookUserId){
      this.setState({facebookUserId: facebookUserId})
      this.fetchUserSettings(facebookUserId);
    }
  }

  fetchUserSettings(facebookUserId){
    let self = this;
    fetch('api/user/' + facebookUserId)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(user) {
      if(user){
        let c = user;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MatchMaker</h2>
        </div>
          <LoginComponent updatePermission={this.updatePermission}/>
      </div>
    );
  }
}

export default App;
