import React, { Component } from "react";

import Playlist from './Playlist';

export default class PlaylistList extends Component {
  render() {
    return (
      <div >
          
           {this.props.playlists.map((playlist, index)=>
             <Playlist key={index} playlistName={playlist.name} playlistSongs={playlist.songs}
                  />
            )}

      
      </div>
    );
  }
}
