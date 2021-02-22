import axios from 'axios';
import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap';
import Song from './Song';

export default class SongsList extends Component {
    state = {
        songs: [],
        searchQuery: "a"
    }

    componentDidMount() {
        this.loadSongs();
    }

    loadSongs = () => {
        if (this.state.searchQuery != "") {
            axios.get("https://api.deezer.com/search?q=" + this.state.searchQuery)
                .then(res => {
                    console.log(res.data.data);
                    this.setState({
                        songs: res.data.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    handleSearch = (e) => {
        console.log(e.target.value)
        e.preventDefault();
        const searchValue = e.target.value;
        this.setState({
            searchQuery: searchValue
        })
        this.loadSongs();
        // this.forceUpdate();
        console.log("q :" + this.state.searchQuery)
    }

    render() {
        return (
            <div>
                <input type="text" onChange={(e) => this.handleSearch(e)}></input>
                <CardDeck>

                    {this.state.songs.map((song, index) =>
                        <div key={index}>
                            <Song {...song} userId={this.props.userId} isAuth={this.props.isAuth} />
                        </div>)}
                </CardDeck>
            </div>
        )
    }
}
