import React, { Component } from 'react'
import {Form  } from "react-bootstrap";

export default class AddPlaylist extends Component {
    constructor(props){
        super(props);
        this.state ={
            newPlaylist : {}
        }
    }

    handleChange= (e) =>{
        const key = e.target.name
        const value = e.target.value

        const updatedPlaylist = {...this.state.newPlaylist}
        updatedPlaylist[key] = value
        updatedPlaylist["user"] = this.props.userId

        console.log(updatedPlaylist)
        this.setState({
            newPlaylist: updatedPlaylist
        })

    }

    handleSubmit =(e) =>{
        e.preventDefault()

        this.props.addPlaylist(this.state.newPlaylist);
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                        <Form.Label>Name</Form.Label>
                        <input
                        name="name"
                        type="text"
                        onChange={this.handleChange}></input>
                    <div>
                        <label>image</label>
                        <input
                        name="image"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input type="submit" value="Add Playlist"></input>
                    </div>
                </Form>
            </div>
        )
    }
}
