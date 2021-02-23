import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
export default class Register extends Component {
  state = {
    password: "",
    passwordConfirm: "",
    temp: {},
    failedMessage: "",
  };
  validateEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  registerHandler = () => {
    console.log(this.state);

    if (this.state.password != this.state.passwordConfirm) {
      this.setState({
        failedMessage: "Passwords doesn't match ",
      });
    } else if (!this.validateEmail(this.state.temp["emailAddress"])) {
      this.setState({
        failedMessage: "invalid email address!",
      });
    } else {
      this.props.register(this.state.temp);
    }
  };

  changeHandler = (e) => {
    let temp = this.state.temp;
    temp[e.target.name] = e.target.value;
    temp["password"] = this.state.password;
    temp["userRole"] = "ROLE_USER";

    console.log(temp);
    this.setState({
      temp,
      // password: temp["password"],
      // passwordConfirm: temp["passwordConfirm"]
    });
  };

  passwordHandler = (e) => {
    // let temp = { ... this.state }
    // temp[e.target.name] = e.target.value;
    // console.log(temp);
    // this.setState({
    //     password: temp["password"],
    //     passwordConfirm: temp["passwordConfirm"]
    // })
    let temp = this.state.temp;
    temp["password"] = e.target.value;
    console.log(temp);

    this.setState({
      password: temp["password"],
      // passwordConfirm: temp["passwordConfirm"]
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
    let temp = this.state.temp;
    temp[e.target.name] = e.target.value;
    this.setState({
      // password: temp["password"],
      passwordConfirm: temp["passwordConfirm"],
    });
    if (e.target.value === this.state.password) {
      console.log("input password" + this.state.password);
      console.log("match");
    } else {
      console.log("Passwords don't match");
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={this.changeHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={this.changeHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="emailAddress"
              onChange={this.changeHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.passwordHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirm"
              onChange={this.confirmPassword}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" block onClick={this.registerHandler}>
            Register
          </Button>
        </Container>
      </div>
    );
  }
}
