import axios from 'axios'
import { decode } from 'jsonwebtoken'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AddPlaylist from './AddPlaylist'
import AddSong from './AddSong'
import PlaylistList from './PlaylistList'
import SongsList from './SongsList'
import Login from './user/Login'
import Profile from './user/Profile'
import Register from './user/Register'

export default class App extends Component {

  state = {
    favSongs: [],
    isAuth: false,
    user: null,
    message: null,
    userEmail: null
  };

  getProfile = (user) => {
    axios.get("/user/profile", {
      data: {
        emailAddress: this.state.userEmail,
      }
    })
      .then(res => {
        console.log("got profile" + this.state.userEmail);
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        console.log(this.state.userEmail);

      })

  }

  registerHandler = (user) => {
    axios
      .post("/user/registration", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loginHandler = (user) => {
    axios
      .post("/user/login", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let user = decode(response.data.token);
          this.setState({
            userEmail: user.sub
          })
          console.log(user.sub);

          this.setState({
            isAuth: true,
            user: user
          })
        }

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false
        })
      });
  };

  addPlaylist = (playlist) => {
    axios.post("/playlist/add", playlist, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => {
        console.log("Added!!")
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addSong = (song) => {
    axios.post("/song/add", song, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => {
        console.log("Added!!")
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Router>
        {this.state.message}
        <nav>
          <div>
            <Link to="/SongsList">Songs</Link>{" "}
            <Link to="/PlaylistList">Playlists</Link>{" "}
            <Link to="/AddPlaylist">Add Playlist</Link>{" "}
            <Link to="/AddSong">Add Song</Link>{" "}
            <Link to="/login">Login</Link>{" "}
            <Link to="/register">Sign up</Link>{" "}
            <Link to="/profile">Profile</Link>{" "}

          </div>
        </nav>

        <Route
          path="/SongsList"
          component={() => <SongsList />}
        ></Route>

        <Route
          path="/PlaylistList"
          component={() => <PlaylistList />}
        ></Route>

        <Route
          path="/AddPlaylist"
          component={() => <AddPlaylist addPlaylist={this.addPlaylist} />}
        ></Route>

        <Route
          path="/AddSong"
          component={() => <AddSong addSong={this.addSong} />}
        ></Route>

        <Route
          path="/login"
          component={() => <Login login={this.loginHandler} />}
        ></Route>

        <Route
          path="/register"
          component={() => <Register register={this.registerHandler} />}
        ></Route>

        <Route
          path="/profile"
          component={() => <Profile getProfile={this.getProfile(this.state.userToGetProfile)} />}
        ></Route>
      </Router>
    )
  }
}