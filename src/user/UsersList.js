import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import {Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Fade from 'react-bootstrap/Fade';
import axios from "axios";

export default class UsersList extends Component {

    state={
        successMessage:null,
        failedMessage:null,
        deletedUserId: -1,
        users:[]
        
    }
    componentDidMount=()=>{
        this.getAllUsers()
    }
    getAllUsers = () => {
      axios.get("/user/index")
        .then(res => {
          console.log("users are loaded");
          console.log(res.data);
        this.setState({
          users: res.data
        })
        })
        .catch(err => {
          console.log(err);
        })
    }
    handleDeleteUser=(userId)=>{
        // e.preventDefault()
        console.log(userId)
       
        
            axios.delete("/user/delete?id="+userId)
              .then(res => {
                console.log("user deleted !");
                console.log(res.data);
            this.setState({
                successMessage:"user is deleted successfully",
                failedMessage:null
            })
this.getAllUsers()
          })
              .catch(err => {
                console.log(err);
                this.setState({
                    successMessage:null,
                    failedMessage:"Error during deleting a user"
                })
              })
        
    }
    render() {
        const failedMessage = this.state.failedMessage ? (
            <Alert variant="danger" transition={Fade} >{this.state.failedMessage}</Alert>
          ) : null;
      
          const successMessage = this.state.successMessage ? (
            <Alert variant="success">{this.state.successMessage}</Alert>
          ) : null;
        return (
          <div>          {failedMessage} {successMessage}
         
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User's Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.emailAddress}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>

                  <td>
                    <Link onClick={()=>this.handleDeleteUser(user.userId)} >Delete </Link>
                  </td>
                   
                </tr>
  
              )
              )}
            </tbody>
          </Table>
          </div>
        )
    }
}
