import React, { Component } from 'react'
import SectionLogin from './SectionLogin';

export default class Login extends Component {
    state = {}

    loginHandler = () => {
        this.props.login(this.state);
    }

    changeHandler = (e) => {
        console.log("changeHandler hereeeeeee")
        let temp = { ... this.state }
        temp[e.target.name] = e.target.value;
        this.setState(temp)
        console.log(temp);
    }

    render() {
        return (
            <div>
                <SectionLogin changeHandler={this.changeHandler} loginHandler={this.loginHandler} />
            </div>
        )
    }
}
