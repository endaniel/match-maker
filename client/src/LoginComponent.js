import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.statusChangedCallback = this.statusChangedCallback.bind(this);
    }

    componentWillMount(){
        let statusChangedCallback = this.statusChangedCallback;
        window.fbAsyncInit = function() {
          window.FB.init({
            appId            : '1539973082691171',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
          });
          window.FB.getLoginStatus(statusChangedCallback);
          window.FB.Event.subscribe('auth.statusChange', statusChangedCallback);
          window.FB.Event.subscribe('auth.login', statusChangedCallback);
        };
      
        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
        
      }

      statusChangedCallback(response) {
        if(response.authResponse){
            this.props.updatePermission(true, response.authResponse.userID);
        }
        else{
            this.props.updatePermission(false);
        }
    }

    render() {
        return (
        <div className="fb-login-button"data-max-rows="1" data-size="large" data-button-type="continue_with" 
                data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"
                data-scope="email,public_profile,user_birthday,user_relationship_details,user_friends">
            </div>
        )
    }
}

export default LoginComponent;