import axios from 'axios';
import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap'
import FavSong from '../FavSong'

export default class Profile extends Component {

    state = {
        songs: this.props.profile.songs,
        playlists: this.props.profile.playlists
    }
    componentDidMount() {
        this.loadSongs();
        this.loadPlaylist();
    }

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
    render() {
        this.loadSongs();
        return (
            <div>
                <h1>{this.props.profile.firstName}</h1>
                <h1>{this.props.profile.lastName}</h1>

                <CardDeck>

                    {this.state.songs.map((song, index) =>
                        <div key={index}>
                            <FavSong {...song} isAuth={this.props.isAuth} />
                        </div>)}
                </CardDeck>

            </div>
        )
    }
}
