import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import Fade from "react-bootstrap/Fade";
export default class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSong: {},
            failedMessage:""
        }
    }
     validateURL(url) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
      }
    handleChange = (e) => {
        const key = e.target.name
        console.log("key "+key)
        const value = e.target.value
        console.log("value "+value)

        const updatedSong = { ...this.state.newSong }
        updatedSong[key] = value
        updatedSong["user"] = this.props.userId

        console.log(updatedSong)
        this.setState({
            newSong: updatedSong
        })
        console.log(this.state.newSong)

    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(!this.validateURL(this.state.newSong.mp3Url)){
         this.setState({
             failedMessage:"invalid mp3 url !"
         })

        }else if(this.state.newSong.name == null && this.state.newSong.artistName == null){
            this.setState({
                failedMessage:"the Song must have a name and artist name !"
            })

        }else{
            this.props.addSong(this.state.newSong);
        }
    }
    render() {
        const failedMessage = this.state.failedMessage ? (
            <Alert variant="danger" transition={Fade}>
              {this.state.failedMessage}
            </Alert>
          ) : null;
        return (
            <div>
                 {failedMessage}
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
                        <input type="submit" value="Add Song"></input>
                    </div>
                </Form>
            </div>
        )
    }
}
