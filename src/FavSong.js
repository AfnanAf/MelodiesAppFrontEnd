import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'

export default class FavSong extends Component {
    state = {
        isFav: true,
        isAdded: false,
        playlistAddedTo: [],
    }

    unfavorite = (songId) => {
        this.setState({
            isFav: !this.state.isFav,
        })
        this.props.handleUnFav(songId)

    }

    addToPlaylist = (playlist) => {

        //TODO: seState for isAdded

        this.props.addPlaylist(playlist);
    }

    render() {
        return (
            <Card className="card">
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>

                    <Card.Title className="cardtitle"><span>{this.props.name}</span>
                        {this.props.isAuth ? (this.state.isFav ? <span onClick={() => this.unfavorite(this.props.id)}> <MdFavorite /> </span>
                            : <span><MdFavoriteBorder /> </span>
                        ) : null}
                        {this.props.isAuth ? (this.state.isAdded ? <span onClick={() => this.addToPlaylist(this.props.id)}>  </span>
                            : <span> </span>
                        ) : null}
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                playlists
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {/* {this.props.isAuth ? (this.playlists.map((playlist, index) => {
                                    <Dropdown.Item key={index} onClick={()=>this.addToPlaylist(playlist)}>{playlist.name}</Dropdown.Item>

                                })) : null} */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Title>

                    <Card.Text>
                        {this.props.artistName}
                    </Card.Text>

                </Card.Body>

                <ReactAudioPlayer className="audioplayer"
                    src={this.props.mp3Url}
                    controls />

                <Card.Footer>
                    <small className="text-muted">From Album</small>
                </Card.Footer>
            </Card>

        )
    }
}
