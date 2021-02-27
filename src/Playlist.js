import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongsPlaylist from "./SongsPlaylist";

export default class Playlist extends Component {
    state = {
        key: this.props.key,
        playlist: this.props.playlist,
        isEdit: true,
        editedPlaylist: {},
        playlistName: this.props.playlist.name,
        image: this.props.playlist.image
    }

    editPlaylistForm() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    // editPlaylist(playlist) {
    //     axios.put("/playlist/edit", playlist, {
    //       headers: {
    //         "Authorization": "Bearer " + localStorage.getItem("token")
    //       }
    //     })
    //     .then(res=>{
    //       console.log(res.data)
    //       this.setState({
    //         editedPlaylist: res.data
    //       })
    //     })
    //     .catch(err=>{
    //       console.log(err)
    //     })
    //   }
    
    changeHandler = () => {
        console.log(this.state);

        let editedPlaylistInfo = this.state.editedPlaylist;
        editedPlaylistInfo["image"] = this.state.image;
        editedPlaylistInfo["id"] = this.state.playlist.id;
        editedPlaylistInfo["name"] = this.state.playlistName;
        editedPlaylistInfo["user"] = this.props.userId;
        console.log(this.props.userId);
        console.log(editedPlaylistInfo["user"]);



        console.log(editedPlaylistInfo);
        this.setState({
            editedPlaylist: editedPlaylistInfo,
        });
    }

    editHandler = () => {
        this.changeHandler()
        console.log(this.state);

        this.props.editPlaylist(this.state.editedPlaylist);
        this.setState({
            failedMessage: "",
            isEdit: true
        });
    }

    playlistNameChange = (e) => {
        this.setState({
            playlistName: e.target.value,
        });
    }

    render() {
        return (
            <tr key={this.state.key}>
                <td>{this.state.key}</td>

                {this.state.isEdit ? (<td>
                    <Link to="/SongsPlaylist">
                        {" "}{this.state.playlist.name}
                    </Link>
                </td>)
                    : (<td>
                        <input value={this.state.playlistName} name="name" onChange={this.playlistNameChange} />
                        <button onClick={this.editHandler}>Save</button>
                    </td>)}

                <Route
                    path="/SongsPlaylist"
                    component={() => (
                        <SongsPlaylist path="/SongsPlaylist"
                            playlistId={this.state.playlist.id}
                        ></SongsPlaylist>
                    )}
                ></Route>
                <td>
                    <Link onClick={() => this.props.deletePlaylist(this.state.playlist.id)} >Delete </Link>
                </td>
                <td>
                    <Link onClick={() => this.editPlaylistForm()} >Edit </Link>
                </td>
            </tr>
        )
    }
}
