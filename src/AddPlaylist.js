import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import { Container, Form, Button } from "react-bootstrap";

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
        <Container>
          <Form.Group>
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="text"
              onChange={this.handleChange}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" block onClick={this.handleSubmit}>
            Add Playlist
          </Button>
        </Container>
      </div>
    );
  }
}
