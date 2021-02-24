import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export default class NewPassword extends Component {
    state = {
        currentPassword: this.props.userCurrentPassword,
        newPassword:"",
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
      this.props.changePasswordHandler(this.state.currentPassword,this.state.newPassword );
    }
  };

  changeHandler = (e) => {
   
    this.setState({
      currentPassword:e.target.value
     
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
                   
                   <Form.Group>
                       <Form.Label>Current Password</Form.Label>
                       <Form.Control type="password" name="currentPassword" onChange={this.changeHandler}></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       <Form.Label>New Password</Form.Label>
                       <Form.Control type="password" name="password" onChange={this.passwordHandler}></Form.Control>
                   </Form.Group>

                   <Form.Group>
                       <Form.Label>New Password Confirmation</Form.Label>
                       <Form.Control type="password" name="passwordConfirm" onChange={this.confirmPassword}></Form.Control>
                   </Form.Group>


                   <Button variant="primary" block onClick={this.newPasswordHandler}>Change Password</Button>
               </Container>
            </div>
        )
    }
}
