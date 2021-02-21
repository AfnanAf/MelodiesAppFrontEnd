import React, { Component } from 'react'
import {Form  } from "react-bootstrap";

export default class AddSong extends Component {
    constructor(props){
        super(props);
        this.state ={
            newSong : {}
        }
    }

    handleChange= (e) =>{
        const key = e.target.name
        const value = e.target.value

        const updatedSong = {...this.state.newSong}
        updatedSong[key] = value
        console.log(updatedSong)
        this.setState({
            newSong: updatedSong
        })

    }

    handleSubmit =(e) =>{
        e.preventDefault()

        this.props.addSong(this.state.newSong);
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
                        <label>mp3 Url</label>
                        <input
                        name="mp3Url"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label>artist Name</label>
                        <input
                        name="artistName"
                        type="text"
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        {/* <input type="hidden" name="user" value={}></input> */}
                        <input type="submit" value="Add Song"></input>
                    </div>
                </Form>
            </div>
        )
    }
}
