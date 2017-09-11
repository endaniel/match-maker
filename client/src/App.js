import React, { Component } from 'react';
import logo from './cupid.svg';
import LoginComponent from './LoginComponent';
import UserSettings from './UserSettings';
import './App.css';
import _ from 'underscore';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isAutho: false, facebookUserId: 0, userSettings: {}};
    this.updatePermission = this.updatePermission.bind(this);
    this.fetchUserSettings = this.fetchUserSettings.bind(this);
    this.getPageByUserAuthorization = this.getPageByUserAuthorization.bind(this);
  }

  updatePermission(isAutho, facebookUserId){
    this.setState({isAutho: isAutho});
    if(facebookUserId){
      this.setState({facebookUserId: facebookUserId})
      this.fetchUserSettings(facebookUserId);
    }
  }

  getPageByUserAuthorization(){
    let homePageByUserPrivligaes;
    if(!_.isEmpty(this.state.userSettings)){
    }
    else if(!_.isEmpty(this.state.facebookUserId)){
      homePageByUserPrivligaes = <UserSettings userId={this.state.facebookUserId}/>
    }
    else{
      homePageByUserPrivligaes = <LoginComponent updatePermission={this.updatePermission}/>;
    }

    return homePageByUserPrivligaes;
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
      if(!_.isEmpty(user.settings)){
        self.setState({userSettings: user.settings})
      }
    });
  }

  render() {
    let page = this.getPageByUserAuthorization();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to MatchMaker</h2>
        </div>
          {page}
      </div>
    );
  }
}

export default App;
