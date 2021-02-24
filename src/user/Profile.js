import axios from "axios";
import React, { Component } from "react";
import { Alert, CardDeck } from "react-bootstrap";
import FavSong from "../FavSong";
import { Redirect } from "react-router-dom";
import NewPassword from './NewPassword';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Fade from "react-bootstrap/Fade";
export default class Profile extends Component {
  state = {
    songs: this.props.profile.songs,
    playlists: this.props.profile.playlists,
    isPasswordChange:false
  };

  // componentDidMount() {
  //     this.loadSongs();
  //     this.loadPlaylist();
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log(nextProps, nextState);
  //     console.log(this.props, this.state);
  //     this.loadSongs();
  //     this.loadPlaylist();

  //     return false;
  // }

  redirectToLogin = () => {
    if (this.props.isAuth) return <Redirect to="/login" />;
  };


  changePasswordHandler=(currentPassword,newPassword)=>{
  const user = this.props.profile

  user["password"] = newPassword
  console.log("user with new Password "+ user)

    axios
    .put("/user/changePassword?currentPassword="+currentPassword , user, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
    .then(response => {
      console.log("respose ==== "+response.data);
      if(response.data ==true){
        this.setState({
            successMessage: "Password changed successfully !!!",
            failedMessage: null,
            redirect: "/profile"
           
          })
      }else{
        this.setState({
            successMessage: null,
            failedMessage: "Error occurred during changing your password , try again ",
           
          })
      }
  
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        successMessage: null,
        failedMessage: "Error occurred during requesting change password , try again ",
       
      })
    });
  }
  
  changePasswordForm=()=>{
      this.setState({
          isPasswordChange: !this.state.isPasswordChange
      })
  }
  render() {
    const failedMessage = this.state.failedMessage ? (
        <Alert variant="danger" transition={Fade}>
          {this.state.failedMessage}
        </Alert>
      ) : null;

      const successMessage = this.state.successMessage ? (
        <Alert variant="success" transition={Fade}>
          {this.state.successMessage}
        </Alert>
      ) : null;
    return (
      <div>
           {failedMessage} {successMessage}
        <span>
          <p>First Name: {this.props.profile.firstName}</p>
          <p>Last Name: {this.props.profile.lastName}</p>
          <p>Email: {this.props.profile.emailAddress}</p>
       
            <p>
              Password:{" "}
              <a onClick={this.changePasswordForm}>
                Change Password
              </a>
            </p>

       {this.state.isPasswordChange ? (<NewPassword
                  path="/NewPassword"
                  userCurrentPassword ={this.props.profile.password}
                  changePasswordHandler={this.changePasswordHandler}
                ></NewPassword>) :null }
                
              
        
        </span>

        <CardDeck>
          {this.state.songs.map((song, index) => (
            <div key={index}>
              <FavSong
                {...song}
                handleUnFav={this.props.handleunFav}
                isAuth={this.props.isAuth}
              />
            </div>
          ))}
        </CardDeck>
      </div>
    );
  }
}
