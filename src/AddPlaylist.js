import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import { Container, Form, Button } from "react-bootstrap";
import SectionAddPlaylist from "./SectionAddPlaylist";

export default class AddPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlaylist: {},
      failedMessage: "",
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
      <Alert variant="danger" transition={Fade}>
        {this.state.failedMessage}
      </Alert>
    ) : null;
    return (
      <div>
        {failedMessage}
        <SectionAddPlaylist handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
