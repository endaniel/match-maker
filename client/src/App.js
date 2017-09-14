import React, { Component } from 'react';
import logo from './cupid.svg';
import LoginComponent from './LoginComponent';
import UserSettings from './UserSettings';
import Loading from './Loading';
import Home from './Home';
import './App.css';
import _ from 'underscore';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {facebookUserId: 0, userSettings: {}, isLoading: false};
    this.updatePermission = this.updatePermission.bind(this);
    this.fetchUserSettings = this.fetchUserSettings.bind(this);
    this.getPageByUserAuthorization = this.getPageByUserAuthorization.bind(this);
  }

  updatePermission(facebookUserId){
    if(facebookUserId){
      this.fetchUserSettings(facebookUserId);
      this.setState({facebookUserId: facebookUserId, isLoading: true})
    }
    else{
      this.setState({facebookUserId: 0, userSettings: {}, isLoading: false})
    }
  }

  getPageByUserAuthorization(){
    let homePageByUserPrivligaes;
    if(this.state.isLoading){
      homePageByUserPrivligaes = <Loading/>
    }
    else if(!_.isEmpty(this.state.userSettings)){
      homePageByUserPrivligaes = <Home facebookUserId={this.state.facebookUserId} settings={this.state.userSettings}/>
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
        self.setState({userSettings: user.settings, isLoading: false})
      }
      else{
        self.setState({isLoading: false})
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
        <div className="App-body">
          {page}
        </div>
      </div>
    );
  }
}

export default App;
