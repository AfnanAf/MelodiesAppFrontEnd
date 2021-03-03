import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class Song extends Component {
    state = {
        isFav: false,
        newSong: {}
    }

    favorite = (song) => {
        this.setState({
            isFav: !this.state.isFav,
        })
        this.props.handleFav(song)
    }

    addSongToPlaylist = (playlistId, song) => {
        console.log(playlistId)
        console.log(playlistId)
        const newSong = this.state.newSong;
        newSong["image"] = song.album.cover_big;
        newSong["name"] = song.title;
        newSong["artistName"] = song.artist.name;
        newSong["mp3Url"] = song.preview;

        var playlist = [{ id: playlistId }];
        console.log(playlist)
        newSong["playlists"] = playlist;
        console.log(newSong["playlists"])
        console.log(newSong)
        this.props.addSong(this.state.newSong);
    }

    redirectToAddPlaylist() {
        this.setState({
            redirect: "/AddPlaylist"
        })
    }

    render() {
        const playlistsNum = this.props.isAuth ? this.props.playlists.length : null;
        console.log("num " + playlistsNum)

        return (
            <div>
                <Card className="card">
                    <Card.Img variant="top" src={this.props.song.album.cover_big} />
                    <Card.Body>

                        <Card.Title style={{color:"#5E2984"}} className="cardtitle"><span>{this.props.song.title}</span>
                            {this.props.isAuth ? (
                                this.state.isFav ?
                                    <span> <MdFavorite /></span>
                                    :
                                    <span onClick={() => this.favorite(this.props.song)}><MdFavoriteBorder /> </span>
                            ) :
                            null}

                            {this.props.isAuth ? (
                                playlistsNum > 0 ? (

                                    <DropdownButton variant="secondary" title="+">
                                        {this.props.playlists.map((playlist, index) => (
                                            <Dropdown.Item onClick={() => this.addSongToPlaylist(playlist.id, this.props.song)} key={index} href={`#/playlist-${index}`}>{playlist.name}</Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                )
                                    : (
                                        <DropdownButton variant="secondary" title="+">
                                            <Dropdown.Item onClick={() => this.redirectToAddPlaylist()}>you don't have any playlist, create one from here</Dropdown.Item>
                                        </DropdownButton>
                                    )
                            ) : null}
                        </Card.Title>

                        <Card.Text>
                            {this.props.song.artist.name}
                        </Card.Text>

                    </Card.Body>

                    <ReactAudioPlayer className="audioplayer"
                        src={this.props.song.preview}
                        controls />

                    <Card.Footer>
                        <small className="text-muted">From {this.props.song.album.title} Album</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}
