import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class Song extends Component {
    render() {
        return (
            <div>
                <Card border="primary">
                    <Card.Img variant="top" src={this.props.album.cover} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.artist.name}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}
