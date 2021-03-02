import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongsPlaylist from "./SongsPlaylist";
import { Card } from 'react-bootstrap'

import {MdDelete} from 'react-icons/md'
import Button from "./components/CustomButtons/Button";
import { TramRounded } from "@material-ui/icons";

export default class Playlist extends Component {
    state = {
        key: this.props.key,
        playlist: this.props.playlist,
        isEdit: true,
        editedPlaylist: {},
        playlistName: this.props.playlist.name,
        image: this.props.playlist.image,
        isDetail:true
    }

    editPlaylistForm() {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    
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
            isEdit: false
           
        });
    }

    playlistNameChange = (e) => {
        this.setState({
            playlistName: e.target.value,
        });
    }
    goToDetail=()=>{
        this.setState({
            isDetail:!this.state.isDetail
        })
    }

    render() {
//         let allSongs=[]
//         let allPlaylists=[]
//         let editForm=[]
//         let cardTitle=[]
//         let showEditForm = <Card.Body>
//         <Card.Title className="cardtitle">
//             <span><Link style={{color:"#9D319D",}} onClick={this.setState({isDetail:!this.state.isDetail})}>{this.state.playlist.name}</Link></span>
          
//         </Card.Title>

//     </Card.Body>;
//     let showCardTitle=<Card.Body>

//     <Card.Title className="cardtitle">
//         <input value={this.state.playlistName} name="name" onChange={this.playlistNameChange} />
//     </Card.Title>
  
    
//     <Button  onClick={this.editHandler}>Save</Button>
// </Card.Body>;
// let showSongs = <div>
//     {/* <h1 onClick={this.goToDetail()}>{this.state.playlist.name}</h1>  */}
//    <SongsPlaylist playlistId={this.state.playlist.id}/> </div>;

//  let showPlaylists =   <div> <Card className="card">
//  {/* {redirect} */}
//  <Card.Img variant="top" src={this.state.playlist.image} />
 

//  <Card.Footer className="cardtitle">
//      <small className="text-muted" onClick={() => this.editPlaylistForm()}>Edit Playlist</small>
     
//      <span onClick={() => this.props.deletePlaylist(this.state.playlist.id)}> <MdDelete /> </span>
//  </Card.Footer>
// </Card>
// </div>;  

// this.state.isDetail ==true ? allSongs= showSongs : allPlaylists= showPlaylists;

// this.state.isEdit ? editForm =showEditForm: cardTitle=showPlaylists;
        return (
        //   <div>  {allSongs} {allPlaylists} {editForm} {cardTitle} </div>
 <Router>
{this.state.isDetail ?
    (
        <div>
            <Card className="card">
            {/* {redirect} */}

            <Card.Img variant="top" src={this.state.playlist.image} />
            {this.state.isEdit ?
                (<Card.Body>
 
                    <Card.Title className="cardtitle">
                        <span><Link style={{color:"#9D319D",}}to="/PlaylistSongsList" onClick={()=>this.goToDetail()}>{this.state.playlist.name}</Link></span>
                      
                        
                     
                    </Card.Title>

                </Card.Body>

                )
                : (<Card.Body>

                    <Card.Title className="cardtitle">
                        <input value={this.state.playlistName} name="name" onChange={this.playlistNameChange} />
                    </Card.Title>
                  
                    
                    <Button  onClick={this.editHandler}>Save</Button>
                </Card.Body>

                )
            }

            <Card.Footer className="cardtitle">
                <small className="text-muted" onClick={() => this.editPlaylistForm()}>Edit Playlist</small>
                
                <span onClick={() => this.props.deletePlaylist(this.state.playlist.id)}> <MdDelete /> </span>
            </Card.Footer>
        </Card>
        </div> ):(
        <div>
{/* <h1 onClick={this.goToDetail()}>{this.state.playlist.name}</h1> */}
    <Route path="/PlaylistSongsList" component={()=><SongsPlaylist playlistId={this.state.playlist.id}/> }></Route> </div>)}
   
</Router> 

          
        )
  }
}