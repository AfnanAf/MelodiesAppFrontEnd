import axios from 'axios';
import React, { Component } from 'react'
import { Alert, CardDeck } from 'react-bootstrap'
import FavSong from '../FavSong'
import { Redirect } from 'react-router-dom'

export default class Profile extends Component {

    state = {
        songs: this.props.profile.songs,
        playlists: this.props.profile.playlists,
    }

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
        if (this.props.isAuth)
            return <Redirect to='/login' />;
    }



    render() {

        return (

            <div>

                <h1>{this.props.profile.firstName}</h1>
                <h1>{this.props.profile.lastName}</h1>

                <CardDeck>

                    {this.state.songs.map((song, index) =>
                        <div key={index}>
                            <FavSong {...song} handleUnFav={this.props.handleunFav} isAuth={this.props.isAuth} />
                        </div>)}
                </CardDeck>

            </div>
        )
    }
}
