import axios from 'axios';
import React, { Component } from 'react'
import { Alert, CardDeck } from 'react-bootstrap'
import FavSong from '../FavSong'
import { Redirect } from 'react-router-dom'

export default class Profile extends Component {

    state = {
        songs: this.props.profile.songs,
        playlists: this.props.profile.playlists,
        failedMessage: "",
        successMessage: ""
    }

    componentDidMount() {
        this.loadSongs();
        this.loadPlaylist();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps, nextState);
    //     console.log(this.props, this.state);
    //     this.loadSongs();
    //     this.loadPlaylist();

    //     return false;
    // }

    loadSongs = () => {
        axios.get("/song/index")
            .then(res => {
                console.log(res);
                if (res.data.id == this.props.userId) {
                    this.setState({
                        songs: res.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    loadPlaylist = () => {

    }

    redirectToLogin = () => {
        if (this.props.isAuth)
            return <Redirect to='/login' />;
    }

    handleUnFavorite = (songId) => {
        console.log("unfav clicked !!!!!");

        if (songId != null) {

            this.setState({
                isFav: !this.state.isFav,
            })

            axios.delete("/song/delete?id=" + songId, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => {
                    console.log("deleted!!")
                    console.log(res);
                    this.setState({
                        failedMessage: "",
                        successMessage: "The song deleted successfully"
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        failedMessage: "Error acuured during deleting the song, please try again later!",
                        successMessage: ""
                    })
                })
        } else {
            this.setState({
                failedMessage: "The song already has deleted",
                successMessage: ""
            })
        }
    }


    render() {

        const failedMessage = this.state.failedMessage ? (
            <Alert variant="danger">{this.state.failedMessage}</Alert>
        ) : null;

        const successMessage = this.state.successMessage ? (
            <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null;

        return (

            <div>
                {failedMessage} {successMessage}

                <h1>{this.props.profile.firstName}</h1>
                <h1>{this.props.profile.lastName}</h1>

                <CardDeck>

                    {this.state.songs.map((song, index) =>
                        <div key={index}>
                            <FavSong {...song} setMessage={this.handleUnFavorite} isAuth={this.props.isAuth} failedMessage={this.state.failedMessage} successMessage={this.state.successMessage} />
                        </div>)}
                </CardDeck>

            </div>
        )
    }
}
