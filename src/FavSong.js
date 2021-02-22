import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

export default class FavSong extends Component {
    state = {
        isFav: true,
    }

    handleUnFavorite = (songId) => {
        console.log("unfav clicked !!!!!");

        this.setState({
            isFav: !this.state.isFav,
        })

        axios.delete("/song/delete?id=" + songId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log("deleted!!")
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Card className="card">
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>

                    <Card.Title className="cardtitle"><span>{this.props.name}</span>
                        {this.props.isAuth? (this.state.isFav ? <span onClick={() => this.handleUnFavorite(this.props.id)}> <MdFavorite /> </span>
                            : <span><MdFavoriteBorder /> </span>
                        ):null}
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
