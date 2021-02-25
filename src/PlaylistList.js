import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongsPlaylist from "./SongsPlaylist";

export default class PlaylistList extends Component {

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
            {this.props.playlists.map((playlist, index) => (
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
              </tr>

            )
            )}
          </tbody>
        </Table>
      </Router>
    );
  }
}
