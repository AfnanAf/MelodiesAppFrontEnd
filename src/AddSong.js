import React, { Component } from "react";
import SectionAddSong from "./SectionAddSong";

export default class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSong: {},
      failedMessage: this.props.failedMessage,
       successMessage: this.props.successMessage
    };
  }

  validateURL(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  }

  handleChange = (e) => {
    const key = e.target.name;
    console.log("key " + key);
    const value = e.target.value;
    console.log("value " + value);

    const updatedSong = { ...this.state.newSong };
    updatedSong[key] = value;
    updatedSong["user"] = this.props.userId;

    console.log(updatedSong);
    this.setState({
      newSong: updatedSong,
    });
    console.log(this.state.newSong);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateURL(this.state.newSong.mp3Url)) {
      this.setState({
        failedMessage: "invalid mp3 url !",
      });
    } else if (
      this.state.newSong.name == null &&
      this.state.newSong.artistName == null
    ) {
      this.setState({
        failedMessage: "the Song must have a name and artist name !",
      });
    } else {
      this.setState({successMessage:"The Song is added successfully"})

      this.props.addSong(this.state.newSong);
    }
  }

  render() {
    // const failedMessage = this.state.failedMessage ? (
    //   <SectionNotifications type='failure' message={this.state.failedMessage}></SectionNotifications>
    // ) : null;

    // const successMessage = this.state.successMessage ? (
    //   <SectionNotifications type='success' message={this.state.successMessage}></SectionNotifications>
    // ) : null;

    return (
      <div>
        {/* {failedMessage}{successMessage} */}
        <SectionAddSong handleChange={this.handleChange} handleSubmit={this.handleSubmit} failedMessage={this.state.failedMessage} successMessage={this.state.successMessage} />
      </div>
    );
  }
}
