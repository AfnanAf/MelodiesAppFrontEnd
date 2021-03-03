import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";

export default class SongsPlaylist extends Component {

  state = {
    playlistSongs: [],
  }

  componentDidMount(){
    this.loadPlaylistSongs();
  }

  loadPlaylistSongs = () => {
    axios.get(`${process.env.REACT_APP_Back_END_URL}/song/index`)
      .then(res => {
        console.log("playlist songs loaded");
        console.log(res.data);

        const playlistSongs = [];
        var playlistSong = {};

        for (var i = 0; i < res.data.length; i++) {
          console.log("for loop i: " + i);
          if (res.data[i].playlists.length != 0) {
            for (var j = 0; j < res.data[i].playlists.length; j++) {
              console.log("for loop j: " + j);
              if (res.data[i].playlists[j].id == this.props.playlistId) {
                console.log(res.data);
                playlistSong = res.data[i];
              }
              console.log(playlistSong)
            }
            playlistSongs.push(playlistSong);
            console.log(playlistSongs);
          }
        }
        this.setState({
          playlistSongs: playlistSongs
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const numOfSongs = this.state.playlistSongs.length;

    return (
      <CardDeck>
        {numOfSongs > 0
          ? this.state.playlistSongs.map((song, index) => (
            <Card className="card" key={index}>
              {/* <Card.Img variant="top" src={song.image} /> */}

              <Card.Body>
                <Card.Title className="cardtitle">
                  <span key={index}> {song.name} </span>
                </Card.Title>
                <Card.Text>{song.artistName}</Card.Text>
                <ReactAudioPlayer
                  className="audioplayer"
                  src={song.mp3Url}
                  controls
                />
              </Card.Body>
            </Card>
          ))
          : null}
      </CardDeck>
    );
  }
}