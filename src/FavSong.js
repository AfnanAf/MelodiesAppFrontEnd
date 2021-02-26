import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

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
        const playlistsNum = this.props.playlists.length;
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

                        {/* {playlistsNum <= 0 ? */}
                        {/* <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.props.playlists[1].name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.props.playlists.map((playlist, index) => {
                                    <Dropdown.Item href={`#/action-${index}`}>{playlist.name}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>

                        </Dropdown> */}

                        <DropdownButton id="dropdown-basic-button" title={this.props.playlists[0].name}>
                            {this.props.playlists.map((playlist, index) => {
                                <Dropdown.Item key={index} href={`#/action-${index}`}>{playlist.name}</Dropdown.Item>
                            })}
                        </DropdownButton>

                        {/* : null} */}
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
