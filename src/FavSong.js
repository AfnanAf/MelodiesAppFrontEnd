import React, { Component, Profiler } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Button } from 'react-bootstrap';
import { Redirect, Router } from 'react-router-dom';

export default class FavSong extends Component {
    state = {
        isFav: true,
        isAdded: false,
        playlistAddedTo: [],
        isEdit: true,
        editedSong: {},
        failedMessage: "",
        songName: this.props.song.name,
        artistName: this.props.song.artistName,
        mp3Url: this.props.song.mp3Url,
        newSong: this.props.song,
        redirect: null,
    }

    unfavorite = (songId) => {
        this.setState({
            isFav: !this.state.isFav,
        })
        this.props.handleunFav(songId)
    }

    addToPlaylist = (playlist) => {

        //TODO: seState for isAdded

        this.props.addPlaylist(playlist);
    }

    editSongForm() {
        console.log("edit song clicked")
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    editHandler = () => {
        this.changeHandler()
        console.log(this.state);

        this.props.editSong(this.state.editedSong);
        this.setState({
            failedMessage: "",
        });
    }

    songNameChange = (e) => {
        this.setState({
            songName: e.target.value,
        });
    }

    artistNameChange = (e) => {
        this.setState({
            artistName: e.target.value,
        });
    }

    mp3UrlChange = (e) => {
        this.setState({
            mp3Url: e.target.value,
        });
    }

    changeHandler = () => {
        console.log(this.state);

        let editedSongInfo = this.state.editedSong;
        editedSongInfo["image"] = this.props.song.image;
        editedSongInfo["id"] = this.props.song.id;
        editedSongInfo["artistName"] = this.state.artistName;
        editedSongInfo["name"] = this.state.songName;
        editedSongInfo["mp3Url"] = this.state.mp3Url;
        editedSongInfo["user"] = this.props.song.userId;


        console.log(editedSongInfo);
        this.setState({
            editedSong: editedSongInfo,
        });
    }

    validateURL(url) {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(url);
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!this.validateURL(this.state.editedSong.mp3Url)) {
    //         this.setState({
    //             failedMessage: "invalid mp3 url !",
    //         });
    //     } else if (
    //         this.state.editedSong.name == null &&
    //         this.state.editedSong.artistName == null
    //     ) {
    //         this.setState({
    //             failedMessage: "the Song must have a name and artist name !",
    //         });
    //     } else {
    //         this.props.editSong(this.state.editedSong);
    //     }
    // }

    addSongToPlaylist = (playlistId) => {
        console.log(playlistId)
        const newSong = this.state.newSong;
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
        const playlistsNum = this.props.playlists.length;
        console.log("num "+playlistsNum)

        const redirect = (this.state.redirect != null) ?
            <Redirect to={this.state.redirect} /> :
            null;

        return (

            <Card className="card">
                {redirect}

                <Card.Img variant="top" src={this.props.song.image} />
                {this.state.isEdit ?
                    (<Card.Body>

                        <Card.Title className="cardtitle"><span>{this.props.song.name}</span>
                            {this.props.isAuth ? (this.state.isFav ? <span onClick={() => this.unfavorite(this.props.song.id)}> <MdFavorite /> </span>
                                : <span><MdFavoriteBorder /> </span>
                            ) : null}

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
                            {playlistsNum > 0 ? (

                                <DropdownButton variant="secondary" title="+">
                                    {this.props.playlists.map((playlist, index) => (
                                        <Dropdown.Item onClick={() => this.addSongToPlaylist(playlist.id)} key={index} href={`#/playlist-${index}`}>{playlist.name}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            )
                                : (
                                    <DropdownButton id="dropdown-basic-button" title="+">
                                        <Dropdown.Item onClick={() => this.redirectToAddPlaylist()}>you don't have any playlist, create one from here</Dropdown.Item>
                                    </DropdownButton>
                                )}
                        </Card.Title>

                        <Card.Text>
                            {this.props.song.artistName}
                        </Card.Text>
                        <ReactAudioPlayer className="audioplayer"
                            src={this.props.song.mp3Url}
                            controls />
                    </Card.Body>

                    )
                    : (<Card.Body>

                        <Card.Title className="cardtitle">
                            <input value={this.state.songName} name="name" onChange={this.songNameChange} />
                        </Card.Title>
                        <Card.Text>
                            <input value={this.state.artistName} name="artistName" onChange={this.artistNameChange} />
                        </Card.Text>
                        <input value={this.state.mp3Url} name="mp3Url" onChange={this.mp3UrlChange} />
                        <Button variant="primary" block onClick={this.editHandler}>Save</Button>
                    </Card.Body>

                    )
                }

                <Card.Footer>
                    <small className="text-muted">From Album</small>
                    <br />
                    <small className="text-muted" onClick={() => this.editSongForm()}>Edit Song</small>
                </Card.Footer>
            </Card>
        )
    }
}
