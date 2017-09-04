import React from 'react';
// import {Redirect, Route} from 'react-router-dom';


class Matching extends React.Component{
    constructor(props){
        super(props);
        this.state = {userFriends: null}
        this.setFriends = this.setFriends.bind(this);
    }

    setFriends(response){
        if(response && !response.error)
            this.setState({userFriends: response.data})
    }

    componentDidMount(){
        if(this.props.currentUser.id)
            window.FB.api('/me/friends?fields=id,name,gender,birthday,picture',  this.setFriends);
    }
    render(){
        return(
            <ul>
                {this.state.userFriends ? this.state.userFriends.map(userFriend => <li>{userFriend.name}</li>) : null}
            </ul>
        )
    }
}

export default Matching;