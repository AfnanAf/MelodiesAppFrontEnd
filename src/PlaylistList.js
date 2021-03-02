import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Playlist from "./Playlist";
import SongsPlaylist from "./SongsPlaylist";
import SectionNotifications from './Snackbar/SectionNotifications'
import { Alert, CardDeck } from "react-bootstrap";
import Button from "./components/CustomButtons/Button";
import SectionPlaylistList from './SectionPlaylistList';
export default class PlaylistList extends Component {

  state = {
    playlists: this.props.playlists,
    editedPlaylist: {},
    failedMessage: this.props.failedMessage,
    successMessage: this.props.successMessage,
    isDetail: false,
    clickedPlaylist: {}
  }

  goToDetail = (clickedPlaylist) => {
    this.setState({
      isDetail: !this.props.isDetail,
      clickedPlaylist: clickedPlaylist
    })
  }

  render() {
    const failedMessage = this.state.failedMessage ? (

      <SectionNotifications type='failure' message={this.state.failedMessage}></SectionNotifications>
    ) : null;

    const successMessage = this.state.successMessage ? (


      <SectionNotifications type='success' message={this.state.successMessage}></SectionNotifications>
    ) : null;
    return (

      <Router >

        {successMessage}
        {failedMessage}

        <SectionPlaylistList editedPlaylist={this.props.editedPlaylist} deletePlaylist={this.props.deletePlaylist}
          userId={this.props.userId} playlists={this.state.playlists} editPlaylist={this.props.editPlaylist} isDetail={this.state.isDetail}
          clickedPlaylist={this.state.clickedPlaylist} goToDetail={this.goToDetail}/>

      </Router>
    );
  }
}
