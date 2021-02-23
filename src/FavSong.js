import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

export default class FavSong extends Component {
    state = {
        isFav: true,
        failedMessage: this.props.failedMessage,
        successMessage: this.props.successMessage
    }

    render() {
        return (
            <Card className="card">
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>

                    <Card.Title className="cardtitle"><span>{this.props.name}</span>
                        {this.props.isAuth ? (this.state.isFav ? <span onClick={() => this.props.setMessage(this.props.id)}> <MdFavorite /> </span>
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
