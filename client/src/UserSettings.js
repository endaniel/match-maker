import React from 'react';
import _ from 'underscore';


class UserSettings extends React.Component{
    constructor(props){
        super(props)
        this.state = {purpose: "", intrestedIn: ""}
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleIntrestChange = this.handleIntrestChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePurposeChange(e){
        this.setState({purpose: e.target.value})
    }        

    handleIntrestChange(e){
        this.setState({intrestedIn: e.target.value})
    }


    isValid(){
        if(_.isEmpty(this.state.purpose) ||
            (this.state.purpose === "ms" && _.isEmpty(this.state.intrestedIn))){
                return false;
            }
        return true;
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            fetch('api/user/settings', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    userId: this.props.userId,
                    userSettings: this.state
                })
            })
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
              })
              .then(function(user) {
                if(!_.isEmpty(user)){
                  let a = user;
                }
              });
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>I Want to: </label>
                <select value={this.state.purpose} onChange={this.handlePurposeChange}>
                    <option value=""></option>
                    <option value="ms">Match {String.fromCharCode(0xf00f)} Search</option>
                    <option value="m">Only match other people</option>
                </select>
                {this.state.purpose === "ms" ?
                <div>
                <label>I am intrested in: </label>
                <select value={this.state.intrestedIn} onChange={this.handleIntrestChange}>
                    <option value=""></option>
                    <option value="m">Man</option>
                    <option value="w">Woman</option>
                    <option value="mw">Man {String.fromCharCode(0xf00f)} Women</option>
                </select>
                </div> :
                null}
                <input type="submit" value="Save" disabled={!this.isValid()}/>
            </form>
        )
    }
}
export default UserSettings;