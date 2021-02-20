import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { Card } from 'react-bootstrap'
import ReactPlayer from 'react-player'

export default class Song extends Component {
    render() {
        return (
            <div>
                <Card className="card">
                    <Card.Img variant="top" src={this.props.album.cover_big} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.artist.name}
                        </Card.Text>
                    </Card.Body>

                    <ReactPlayer
                        src={this.props.preview}
                        controls
                    />

                    <Card.Footer>
                        <small className="text-muted">From {this.props.album.title} Album</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}
