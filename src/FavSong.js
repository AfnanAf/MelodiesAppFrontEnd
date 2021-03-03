import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from "./components/CustomButtons/Button";
import { Redirect } from 'react-router-dom';

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

        const redirect = (this.state.redirect != null) ?
            <Redirect to={this.state.redirect} /> :
            null;

        return (
            <Card className="card">

                {redirect}

                <Card.Img variant="top" src={this.props.song.image} />
                {this.state.isEdit ?
                    (<Card.Body>
                        <Card.Title style={{color:"#5E2984"}}  className="cardtitle"><span>{this.props.song.name}</span>
                            {this.props.isAuth ? (this.state.isFav ? <span onClick={() => this.unfavorite(this.props.song.id)}> <MdFavorite /> </span>
                                : <span><MdFavoriteBorder /> </span>
                            ) : null}

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

                        <Card.Text  style={{ color: "#9D319D" ,textAlign:'left'}}>
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
                        <Button  onClick={this.editHandler}>Save</Button>
                    </Card.Body>

                    )
                }
 
                <Card.Footer className="cardtitle">
                    {/* <small className="text-muted">From Album</small>
                    <br /> */}
                    <small style={{cursor:"pointer"}}className="text-muted" onClick={() => this.editSongForm()}>Edit Song</small>
                </Card.Footer>
            </Card>
        )
    }
}
