import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { BsFillLockFill } from "react-icons/bs";
import { Input } from "@material-ui/core";
import Button from "../../src/components/CustomButtons/Button";

export default class NewPassword extends Component {
  state = {
    currentPassword: this.props.userCurrentPassword,
    newPassword: "",
    passwordConfirm: "",
    failedMessage: ""
  };

  newPasswordHandler = () => {
    console.log(this.state);

    if (this.state.newPassword != this.state.passwordConfirm) {
      this.setState({
        failedMessage: "Passwords doesn't match ",
      });
    } else {
      this.props.changePasswordHandler(this.state.currentPassword, this.state.newPassword);
    }
  }

  changeHandler = (e) => {
    this.setState({
      currentPassword: e.target.value
    });
  };

  passwordHandler = (e) => {
    this.setState({
      newPassword: e.target.value
    });

    if (e.target.value === this.state.passwordConfirm) {
      console.log("input password" + this.state.passwordConfirm);
      console.log("match");
      this.changeHandler(e);
    } else {
      console.log("Passwords don't match");
    }
  };

  confirmPassword = (e) => {
    this.setState({
      passwordConfirm: e.target.value
    });
    if (e.target.value === this.state.newPassword) {
      console.log("input password" + this.state.newPassword);
      console.log("match");
    } else {
      console.log("Passwords don't match");
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Input
            style={{ width: 90 + '%', marginBottom: 0.7 + 'em', marginTop: 2 + 'em' }}
            placeholder="Current Password"
            id="pass"
            name="currentPassword"
            onChange={this.changeHandler}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              autoComplete: "off"
            }}
          />
          <BsFillLockFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

          <Input
            style={{ width: 90 + '%', marginBottom: 0.7 + 'em', marginTop: 2 + 'em' }}
            placeholder="New Password"
            id="pass"
            name="password"
            onChange={this.passwordHandler}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              autoComplete: "off"
            }}
          />
          <BsFillLockFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
          <Input
            style={{ width: 90 + '%', marginBottom: 0.7 + 'em', marginTop: 2 + 'em' }}
            placeholder="Confirm New Password"
            id="pass"
            name="passwordConfirm"
            onChange={this.confirmPassword}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              autoComplete: "off"
            }}
          />
          <BsFillLockFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

          <Button onClick={this.newPasswordHandler}>Change Password</Button>
        </Container>
      </div>
    )
  }
}
