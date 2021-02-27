import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Playlist from "./Playlist";
import SongsPlaylist from "./SongsPlaylist";

export default class PlaylistList extends Component {

  state = {
    playlists: this.props.playlists,
    editedPlaylist: {},
  }

  deletePlaylist = (playlistId) => {
    console.log(playlistId)

    axios.delete("/playlist/delete?id=" + playlistId, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("playlist deleted !");
        console.log(res.data);
        this.loadPlaylists()
        this.setState({
          successMessage: "playlist is deleted successfully",
          failedMessage: null
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          successMessage: null,
          failedMessage: "Error during deleting a playlist"
        })
      })
  }

  editPlaylist(playlist) {
    axios.put("/playlist/edit", playlist, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data)
        this.loadPlaylists()
        this.setState({
          editedPlaylist: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadPlaylists() {
    axios.get("/user/profile?email=" + this.props.email, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("playlists >")
        console.log(res.data)
        this.setState({
          playlists: res.data.playLists
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Playlist Name</th>
              <th>Playlist image</th>
            </tr>
          </thead>

          <tbody>
            {this.state.playlists.map((playlist, index) => (
              <Playlist editPlaylist={this.editPlaylist} deletePlaylist={this.deletePlaylist} playlist={playlist} key={index} userId={this.props.userId} />
            )
            )}
          </tbody>
        </Table>
      </Router>
    );
  }
}
