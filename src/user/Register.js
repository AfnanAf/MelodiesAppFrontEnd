import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Register extends Component {
    state = {
        password: "",
        passwordConfirm: "",
        temp: {}
    }

    registerHandler = () => {
        console.log(this.state);
        if (this.state.password == this.state.passwordConfirm) {
            this.props.register(this.state.temp);
        } else {
            alert("password doesn't match")
        }
    }


    changeHandler = (e) => {
        let temp = this.state.temp;
        temp[e.target.name] = e.target.value;
        temp["password"] = this.state.password;

        console.log(temp);
        this.setState({
            temp
            // password: temp["password"],
            // passwordConfirm: temp["passwordConfirm"]
        })
    }

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
        })

        if (e.target.value === this.state.passwordConfirm) {
            console.log("input password" + this.state.passwordConfirm);
            console.log("match");
            this.changeHandler(e);
        } else {
            console.log("Passwords don't match");
        }
    }

    confirmPassword = (e) => {
        let temp = this.state.temp;
        temp[e.target.name] = e.target.value;
        this.setState({
            // password: temp["password"],
            passwordConfirm: temp["passwordConfirm"],
        })
        if (e.target.value === this.state.password) {
            console.log("input password" + this.state.password);
            console.log("match");
        } else {
            console.log("Passwords don't match");
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.passwordHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="passwordConfirm" onChange={this.confirmPassword}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>User Role</Form.Label>
                        <Form.Control as="select" name="userRole" onChange={this.changeHandler}>

                            <option value="">Select Role</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_USER">User</option>

                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" block onClick={this.registerHandler}>Register</Button>
                </Container>

            </div>
        )
    }
}
