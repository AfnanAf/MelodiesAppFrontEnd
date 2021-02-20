import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

export default class Song extends Component {
    state = {
        song: null,
        isFav: false,
        favSongs: []
    }

    handleFavorite = (song) => {
        console.log("fav clicked !!!!!");

        // this.setState({
        //     isFav: !this.state.isFav,
        // })

        const song1 = {}
        song1["name"] = song.title
        song1["image"] = song.album.cover_big
        song1["mp3Url"] = song.preview
        song1["artistName"] = song.artist.name
        console.log(song1)

        axios.post("/song/add", song1)
            .then(res => {
                console.log("Added!!")
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Card className="card">
                    <Card.Img variant="top" src={this.props.album.cover_big} />
                    <Card.Body>

                        <Card.Title className="cardtitle"><span>{this.props.title}</span>
                            <span onClick={this.handleFavorite(this.props)} >
                                {this.state.isFav ? <MdFavorite /> : <MdFavoriteBorder />}
                            </span>
                        </Card.Title>

                        <Card.Text>
                            {this.props.artist.name}
                        </Card.Text>

                    </Card.Body>

                    <ReactAudioPlayer className="audioplayer"
                        src={this.props.preview}
                        controls />

                    <Card.Footer>
                        <small className="text-muted">From {this.props.album.title} Album</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}
