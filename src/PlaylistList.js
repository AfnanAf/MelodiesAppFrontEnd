import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongsPlaylist from "./SongsPlaylist";

export default class PlaylistList extends Component {

  state = {
    playlists: this.props.playlists
  }
  deletePlaylist = (playlistId) => {
    // e.preventDefault()
    console.log(playlistId)


    axios.delete("/playlist/delete?id=" + playlistId, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("playlist deleted !");
        console.log(res.data);
        this.setState({
          successMessage: "playlist is deleted successfully",
          failedMessage: null
        })
        this.loadPlaylists()
      })
      .catch(err => {
        console.log(err);
        this.setState({
          successMessage: null,
          failedMessage: "Error during deleting a playlist"
        })
      })

  }

  loadPlaylists() {
    axios.get("/playlist/index")
      .then(res => {
        console.log("playlists >")
        console.log(res.data)
        this.setState({
          playlists:res.data
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to="/SongsPlaylist">
                    {" "}{playlist.name}
                  </Link>
                </td>
                <Route
                  path="/SongsPlaylist"
                  component={() => (
                    <SongsPlaylist path="/SongsPlaylist"
                      playlistId={playlist.id}
                    ></SongsPlaylist>
                  )}
                ></Route>
                <td>
                  <Link onClick={() => this.deletePlaylist(playlist.id)} >Delete </Link>
                </td>
              </tr>
            )
            )}
          </tbody>
        </Table>
      </Router>
    );
  }
}
