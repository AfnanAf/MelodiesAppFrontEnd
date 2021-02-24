import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongsPlaylist from "./SongsPlaylist";
import Playlist from "./Playlist";

export default class PlaylistList extends Component {
  state = {};
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
            {this.props.playlists.map(
              (playlist, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/SongsPlaylist",
                        state: { playlistSongs: playlist.songs },
                      }}
                    >
                      {" "}
                      {playlist.name}
                    </Link>
                  </td>

                  <Route
                    component={() => (
                      <SongsPlaylist path="/SongsPlaylist"
                        playlistSongs={this.props.playlists.songs}
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
