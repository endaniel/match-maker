import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Matching from './Matching';
import ReactLoading from 'react-loading';
import './Home.css'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {fbProfile: {}};
        this.setUserFacebookProfile = this.setUserFacebookProfile.bind(this);
    }

    setUserFacebookProfile(response){
        this.setState({fbProfile: response});
    }

    setUserAppSettings(response){
        
    }

    componentDidMount(){
        window.FB.api('/me/?fields=id,name,picture', this.setUserFacebookProfile);
        fetch('/api/user/' + this.props.facebookUserId)
        .then(function(response){
            var a = response;
        })

    }

    render(){
        if(!this.props.isAutho){
            <Redirect push to="/unauthorized"/>
        }
        return(
            <div>
                {this.state.fbProfile.name ?
                    <div>
                        <h1>Hello {this.state.fbProfile.name}</h1> 
                        <img src={this.state.fbProfile.picture.data.url}/> 
                        <Matching currentUser={this.state.fbProfile}/> 
                    </div> :
                    <ReactLoading type="spinningBubbles" className="center" color="#444" height="100px" width="100px"/>
                    }
            </div>
        )
    }
}

export default Home;