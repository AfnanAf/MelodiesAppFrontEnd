import axios from "axios";
import React, { Component } from "react";
import { Alert, CardDeck } from "react-bootstrap";
import FavSong from "../FavSong";
import { Redirect } from "react-router-dom";
import NewPassword from "./NewPassword";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fade from "react-bootstrap/Fade";
import { Container, Form, Button } from 'react-bootstrap'

import EditProfile from "./EditProfile";
import ProfilePage from "./ProfilePage/ProfilePage";
export default class Profile extends Component {
    state = {
        songs: this.props.favSongs,
        playlists: this.props.profile.playlists,
        isPasswordChange: false,
        isProfileEdit: false,
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps, nextState);
    //     console.log(this.props, this.state);
    //     this.loadSongs();
    //     this.loadPlaylist();

    //     return false;
    // }

    componentDidMount() {
        // this.props.loadFavSongs();
    }

    redirectToLogin = () => {
        if (this.props.isAuth) return <Redirect to="/login" />;
    };


    editUserInfo = (user, email) => {
        axios
            .put("/user/edit?email=" + email, user, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("edited user respose ==== ");
                console.log(response.data);

                this.setState({
                    successMessage: response.data.message,
                    failedMessage: null,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    successMessage: null,
                    failedMessage:
                        "Error occurred during requesting change profile info , try again ",
                });
            });
        this.props.getProfile();
    };

    changePasswordHandler = (currentPassword, newPassword) => {
        const user = this.props.profile;

        user["password"] = newPassword;
        console.log("user with new Password " + user);

        axios
            .put("/user/changePassword?currentPassword=" + currentPassword, user, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("respose ==== " + response.data);
                if (response.data == true) {
                    this.setState({
                        successMessage: "Password changed successfully !!!",
                        failedMessage: null,
                        redirect: "/profile",
                        isProfileEdit: false,
                    });
                } else {
                    this.setState({
                        successMessage: null,
                        failedMessage: "Error occurred during changing your password , try again ",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    successMessage: null,
                    failedMessage:
                        "Error occurred during requesting change password , try again ",
                });
            });
    };

    changePasswordForm = () => {
        this.setState({
            isPasswordChange: !this.state.isPasswordChange,
        });
    };
    editProfile = () => {
        this.setState({
            isProfileEdit: !this.state.isProfileEdit,
        });
    };
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
                {/* {failedMessage} {successMessage}
                // {this.state.isPasswordChange ? (
                //     <NewPassword
                //         path="/NewPassword"
                //         userCurrentPassword={this.props.profile.password}
                //         changePasswordHandler={this.changePasswordHandler}
                //     ></NewPassword>
                // ) : null}
                // <Button onClick={this.editProfile}>Edit Profile</Button>
                // {this.state.isProfileEdit ? (
                //     <EditProfile
                //         email={this.props.email}
                //         profile={this.props.profile}
                //         editUserInfo={this.editUserInfo}
                //     />
                // ) : (
                //         <span>
                //             <p>First Name: {this.props.profile.firstName}</p>
                //             <p>Last Name: {this.props.profile.lastName}</p>
                //             <p>Email: {this.props.profile.emailAddress}</p>

                //             <p>
                //                 Password: <a onClick={this.changePasswordForm}>Change Password</a>
                //             </p>
                //         </span>
                //     )}
                // <CardDeck>
                //     {this.state.songs.map((song, index) => (
                //         <div key={index}>
                //             <FavSong
                //                 song={song}
                //                 handleUnFav={this.props.handleunFav}
                //                 addPlaylist={this.addPlaylist}
                //                 isAuth={this.props.isAuth}
                //                 playlists={this.props.playlists}
                //                 editSong={this.props.editSong}
                //                 userId={this.props.userId}
                //                 addSong={this.props.addSong}
                //             />
                //         </div>
                //     ))}
                // </CardDeck> */}
                <ProfilePage songs={this.state.songs} changePasswordForm={this.changePasswordForm} profile={this.props.profile} email={this.props.email} isPasswordChange={this.state.isPasswordChange}
                    editUserInfo={this.editUserInfo} isProfileEdit={this.state.isProfileEdit} editProfile={this.editProfile} changePasswordHandler={this.changePasswordHandler} 
                                    handleUnFav={this.props.handleunFav}
                                    addPlaylist={this.addPlaylist}
                                    isAuth={this.props.isAuth}
                                    playlists={this.props.playlists}
                                    editSong={this.props.editSong}
                                    userId={this.props.userId}
                                    addSong={this.props.addSong}
                />
            </div>
        );
    }
}
