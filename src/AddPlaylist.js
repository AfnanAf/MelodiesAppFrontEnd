import React, { Component } from "react";
import SectionAddPlaylist from "./SectionAddPlaylist";
import SectionNotifications from './Snackbar/SectionNotifications'

export default class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlaylist: {},
      failedMessage: this.props.failedMessage,
      successMessage: this.props.successMessage
    };
  }

  handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    const updatedPlaylist = { ...this.state.newPlaylist };
    updatedPlaylist[key] = value;
    updatedPlaylist["user"] = this.props.userId;

    console.log(updatedPlaylist);
    this.setState({
      newPlaylist: updatedPlaylist,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPlaylist.name == null) {
      this.setState({
        failedMessage: "Playlis must have a name !",
      });
    } else {
      this.props.addPlaylist(this.state.newPlaylist);
    }
  };
  render() {
    const failedMessage = this.state.failedMessage ? (
      <SectionNotifications type='failure' message={this.state.failedMessage}></SectionNotifications>
    ) : null;

    const successMessage = this.state.successMessage ? (
      <SectionNotifications type='success' message={this.state.successMessage}></SectionNotifications>
    ) : null;
    
    return (
      <div>
        {failedMessage}{successMessage}
        <SectionAddPlaylist handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
