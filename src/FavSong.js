import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

export default class FavSong extends Component {
    state = {
        isFav: true,
    }

    unfavorite = (songId) => {
        this.setState({
            isFav: !this.state.isFav,
        })
        this.props.handleUnFav(songId)
    
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
