import React, { Component } from 'react'
import SectionLogin from './SectionLogin';
import SectionNotifications from '../Snackbar/SectionNotifications'

export default class Login extends Component {
    state = {
        successMessage:"",
        failedMessage:""
    }

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
        const successMessage = this.props.successMessage ? (
            <div style={{ paddingTop:40+'px' }}>
              <SectionNotifications type='success' message={this.props.successMessage}></SectionNotifications></div>
          ) : null;

          
  
        return (
            <div>
                {successMessage}
                <SectionLogin changeHandler={this.changeHandler} loginHandler={this.loginHandler} />
            </div>
        )
    }
}
