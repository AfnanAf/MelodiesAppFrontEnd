import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AddPlaylist from './AddPlaylist'
import AddSong from './AddSong'
import PlaylistList from './PlaylistList'
import SongsList from './SongsList'

export default class App extends Component {

  state = {
    favSongs: []
  }

  addSong = (song) => {
    axios.post("/song/add", song, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Added!!")
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        console.log(song)
      })
  }

  render() {
    return (
      <Router>
        <nav>
          <div>
            <Link to="/SongsList">Songs</Link>{" "}
            <Link to="/PlaylistList">Playlists</Link>{" "}
            <Link to="/AddPlaylist">Add Playlist</Link>{" "}
            <Link to="/AddSong">Add Song</Link>{" "}
          </div>
        </nav>

        <Route
          path="/SongsList"
          component={() => <SongsList />}
        ></Route>

        <Route
          path="/PlaylistList"
          component={() => <PlaylistList />}
        ></Route>

        <Route
          path="/AddPlaylist"
          component={() => <AddPlaylist />}
        ></Route>

        <Route
          path="/AddSong"
          component={() => <AddSong addSong={this.addSong} />}
        ></Route>

      </Router>
    )
  }
}