import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
export default class EditProfile extends Component {
  state = {
    editedUser: {},
    failedMessage: "",
    lastName: this.props.profile.lastName,
    firstName: this.props.profile.firstName,
    email: this.props.profile.emailAddress,
  };
  validateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  editHandler = () => {
      this.changeHandler()
    console.log(this.state);

    // if (!this.validateEmail(this.state.editedUser["emailAddress"])) {
    //   this.setState({
    //     failedMessage: "invalid email address!",
    //   });
    // } else {
      this.props.editUserInfo(this.state.editedUser, this.props.email);
      this.setState({
        failedMessage: "",
      });
    // }
  };
  lastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  firstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };
  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  changeHandler = () => {
    console.log(this.state);
    
    let editedUserInfo = this.state.editedUser;
    editedUserInfo["firstName"] = this.state.firstName;
    editedUserInfo["lastName"] = this.state.lastName;
    editedUserInfo["emailAddress"] = this.state.email;
    editedUserInfo["userRole"] = "ROLE_USER";
    editedUserInfo["password"] = this.props.profile.password;
    editedUserInfo["userId"] = this.props.profile.userId;

    console.log(editedUserInfo);
    this.setState({
      editedUser:editedUserInfo,
    });
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={this.firstNameChange}
              value={this.state.firstName}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={this.lastNameChange}
              value={this.state.lastName}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="emailAddress"
              contentEditable
              value={this.state.email}
              onChange={this.emailChange}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" block onClick={this.editHandler}>
            Save
          </Button>
        </Container>
      </div>
    );
  }
}
