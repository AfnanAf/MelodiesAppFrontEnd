import axios from 'axios';
import React, { Component } from 'react'
import { CardDeck } from 'react-bootstrap';
import Song from './Song';
import Parallax from "./components/Parallax/Parallax";
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import { Input } from '@material-ui/core';
import { FaSearch } from "react-icons/fa";

export default class SongsList extends Component {
    state = {
        songs: [],
        searchQuery: "r",
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
        console.log("q :" + this.state.searchQuery)
    }

    render() {

        return (
            <div style={{ color: "#9D319D" }}>
                <Parallax style={{ height: 30 + 'em', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom' }} image={require("./assets/img/bg3.jpg")}>

                    <div >
                        <GridContainer style={{ paddingLeft: 3 + 'em' }}>
                            <GridItem style={{ paddingTop: 4 + 'em' }}>
                                <div >
                                    <h1><mark style={{ backgroundColor: "rgb(255,255,255,0.6)", color: "#5E2984" }}>Music For Everyone.</mark></h1>
                                    <h3 ><mark style={{ backgroundColor: "rgb(255,255,255,0.6)", color: "#5E2984" }}>
                                        Life Is One Grand Sweet Song So Start Searching Your Music.</mark></h3>
                                    <mark style={{ backgroundColor: "rgb(255,255,255,0.6)", color: "#5E2984" }}> <Input placeholder="Search..." style={{ width: 50 + '%' }} type="text" onChange={(e) => this.handleSearch(e)} />
                                        <FaSearch />
                                    </mark>

                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <CardDeck style={{ paddingLeft: 2 + 'em' }}>

                    {this.state.songs.map((song, index) =>
                        <div key={index}>
                            <Song playlists={this.props.playlists} addSong={this.props.addSong} song={song} handleFav={this.props.handleFav} isFav={this.props.isFav} userId={this.props.userId} isAuth={this.props.isAuth} />
                        </div>)}
                </CardDeck>
            </div>
        )
    }
}
