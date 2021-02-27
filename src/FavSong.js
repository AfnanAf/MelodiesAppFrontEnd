import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Button } from 'react-bootstrap';

export default class FavSong extends Component {
    state = {
        isFav: true,
        isAdded: false,
        playlistAddedTo: [],
        isEdit: true,

        editedSong: {},
        failedMessage: "",
        songName: this.props.name,
        artistName: this.props.artistName,
        mp3Url: this.props.mp3Url,
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
        editedSongInfo["image"] = this.props.image;
        editedSongInfo["id"] = this.props.id;
        editedSongInfo["artistName"] = this.state.artistName;
        editedSongInfo["name"] = this.state.songName;
        editedSongInfo["mp3Url"] = this.state.mp3Url;
        editedSongInfo["user"] = this.props.userId;


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

    render() {
        const playlistsNum = this.props.playlists.length;
        return (
            <Card className="card">
                <Card.Img variant="top" src={this.props.image} />
                {this.state.isEdit ?
                    (<Card.Body>

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

                            <DropdownButton id="dropdown-basic-button" title="Add to playlist">
                                {this.props.playlists.map((playlist, index) => (
                                    <Dropdown.Item key={index} href={`#/action-${index}`}>{playlist.name}</Dropdown.Item>
                                ))}
                            </DropdownButton>

                            {/* : null} */}
                        </Card.Title>

                        <Card.Text>
                            {this.props.artistName}
                        </Card.Text>
                        <ReactAudioPlayer className="audioplayer"
                            src={this.props.mp3Url}
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
