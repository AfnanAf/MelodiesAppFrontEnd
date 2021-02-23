import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default class Register extends Component {
    state = {
        errors: {},
        temp: {}
    }

    registerHandler = (e) => {
        e.preventDefault();

        if (this.validateInputs) {

            console.log(this.state);

            let temp = {};
            temp["firstName"] = "";
            temp["lastName"] = "";
            temp["emailAddress"] = "";
            temp["password"] = "";
            temp["passwordConfirm"] = "";
            temp["userRole"] = "";

            this.setState({ temp: temp });

            // alert('Demo Form is submited');
            this.props.register(this.state.temp);


        } else {

        }
    }

    validateInputs() {
        let temp = this.state.temp
        let errors = {};
        let isValid = true;

        if (!temp["firstName"]) {
            isValid = false;
            errors["firstName"] = "Please enter your first Name.";
        }

        if (!temp["lastName"]) {
            isValid = false;
            errors["lastName"] = "Please enter your last Name.";
        }

        if (!temp["emailAddress"]) {
            isValid = false;
            errors["emailAddress"] = "Please enter your email Address.";
        }

        if (typeof temp["emailAddress"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(temp["emailAddress"])) {
                isValid = false;
                errors["emailAddress"] = "Please enter valid email address.";
            }
        }

        if (!temp["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!temp["passwordConfirm"]) {
            isValid = false;
            errors["passwordConfirm"] = "Please enter your confirm password.";
        }

        if (typeof temp["password"] !== "undefined" && typeof temp["passwordConfirm"] !== "undefined") {

            if (temp["password"] != temp["passwordConfirm"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }


    changeHandler = (e) => {
        let temp = this.state.temp
        temp[e.target.name] = e.target.value;
        this.setState({ temp });
        console.log(temp);
    }

    // confirmPassword = (e) => {
    //     if (e.target.value === this.state.password) {
    //         console.log("temp password" + this.state.password);
    //         console.log("match");
    //     } else if (this.state.passwordConfirm === this.state.password) {
    //         console.log("match");
    //     } else {
    //         console.log("Passwords don't match");
    //     }
    // }

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
                        <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="passwordConfirm" onChange={this.changeHandler}></Form.Control>
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
