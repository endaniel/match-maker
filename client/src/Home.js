import React from 'react';
import {Link, Switch, Redirect, Route} from 'react-router-dom';
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

    componentDidMount(){
        window.FB.api('/me/?fields=id,name,picture', this.setUserFacebookProfile);
    }

    render(){
        if(!this.props.facebookUserId){
            <Redirect push to="/unauthorized"/>
        }
        return(
            <div>
                {this.state.fbProfile.name ?
                    <div>
                        <h1>Hello {this.state.fbProfile.name}</h1> 
                        <img src={this.state.fbProfile.picture.data.url}/>
                        <Link to="/match">Match</Link>
                        <Link to="/search">Search</Link>
                        <Switch>
                            <Route path="/match" render={() => <Matching currentUser={this.state.fbProfile}/>}/>
                        </Switch> 
                         
                    </div> :
                    <ReactLoading type="spinningBubbles" className="center" color="#444" height="100px" width="100px"/>
                    }
            </div>
        )
    }
}

export default Home;