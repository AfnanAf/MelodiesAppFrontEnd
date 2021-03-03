import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SectionNotifications from '../Snackbar/SectionNotifications'
import ProfilePage from "./ProfilePage/ProfilePage";

export default class Profile extends Component {
    state = {
        songs: this.props.favSongs,
        playlists: this.props.profile.playlists,
        isPasswordChange: false,
        isProfileEdit: false,
        successMessage: this.props.successMessage,
        failedMessage: this.props.failedMessage
    };

    redirectToLogin = () => {
        if (this.props.isAuth) return <Redirect to="/login" />;
    };

    editUserInfo = (user, email) => {
        axios.put(`${process.env.REACT_APP_Back_END_URL}/user/edit?email=` + email, user, {
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

        axios.put(`${process.env.REACT_APP_Back_END_URL}/user/changePassword?currentPassword=` + currentPassword, user, {
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
            <SectionNotifications type='failure' message={this.state.failedMessage}></SectionNotifications>
        ) : null;

        const successMessage = this.state.successMessage ? (
            <SectionNotifications type='success' message={this.state.successMessage}></SectionNotifications>
        ) : null;

        return (
            <div>
                {failedMessage} {successMessage}
                <ProfilePage songs={this.state.songs} changePasswordForm={this.changePasswordForm} profile={this.props.profile} email={this.props.email} isPasswordChange={this.state.isPasswordChange}
                    editUserInfo={this.editUserInfo} isProfileEdit={this.state.isProfileEdit} editProfile={this.editProfile} changePasswordHandler={this.changePasswordHandler}
                    handleunFav={this.props.handleunFav}
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
