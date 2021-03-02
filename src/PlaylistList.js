import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SectionNotifications from './Snackbar/SectionNotifications'
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

  goBack=()=>{
    this.setState({
      isDetail: false,
      clickedPlaylist: {}
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
          clickedPlaylist={this.state.clickedPlaylist} goToDetail={this.goToDetail} goBack={this.goBack}/>

      </Router>
    );
  }
}
