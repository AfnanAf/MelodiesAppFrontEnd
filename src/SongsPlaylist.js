import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";

export default class SongsPlaylist extends Component {
  render() {
    const numOfSongs = this.props.playlistSongs.length;

    return (
      <div>
        {numOfSongs > 0
          ? this.props.playlistSongs.map((song, index) => (
              <Card className="card">
                <Card.Img variant="top" src={song.image} />

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
      </div>
    );
  }
}
