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
              <Playlist editPlaylist={this.props.editPlaylist} deletePlaylist={this.props.deletePlaylist} playlist={playlist} key={index} userId={this.props.userId} />
            )
            )}
          </tbody>
        </Table>
      </Router>
    );
  }
}
