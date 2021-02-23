import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
export default class SongsPlaylist extends Component {
    render() {
        return (
          
                <div>
              {this.props.songsPlaylist.map((song, index) => (
                <Card.Body key={index} >
                  {song} 
                </Card.Body>
              ))}</div>
          
        )
    }
}
