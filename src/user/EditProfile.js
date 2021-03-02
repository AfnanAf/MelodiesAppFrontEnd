import { Input } from "@material-ui/core";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
import Button from "../../src/components/CustomButtons/Button";

import { MdEmail } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";


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
  }

  editHandler = () => {
    this.changeHandler()
    console.log(this.state);

    this.props.editUserInfo(this.state.editedUser, this.props.email);
    this.setState({
      failedMessage: "",
    });
  }

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
      editedUser: editedUserInfo,
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
          <span>
            <Input
              style={{ width: 40 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
              placeholder="First Name..."
              id="email"
              name="firstName"
              value={this.state.firstName}
              onChange={this.firstNameChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
              }}
            />
            <RiUser3Fill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
            <Input
              style={{ width: 40 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em', marginLeft: 5 + 'px' }}
              placeholder="Last Name..."
              id="email"
              name="lastName"
              value={this.state.lastName}
              onChange={this.lastNameChange}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
                autoComplete: "off"
              }}
            />
            <RiUser3Fill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

          </span>
          <Input
            style={{ width: 40 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
            placeholder="Email..."
            id="email"
            name="emailAddress"
            value={this.state.email}
            onChange={this.emailChange}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
            }}
          />
          <MdEmail style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

          <div>
            <Button onClick={this.editHandler}>
              Save
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
