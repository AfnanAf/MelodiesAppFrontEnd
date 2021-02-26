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
import { Alert } from "react-bootstrap";
import Fade from 'react-bootstrap/Fade'
import { Redirect } from "react-router-dom";
import Home from './Home'
import FavSong from './FavSong'

export default class App extends Component {

  state = {
    favSongs: [],
    playlistSongs: [],
    isAuth: false,
    user: null,
    userEmail: "",
    userProfile: {},
    userId: {},
    failedMessage: null,
    successMessage: null,
    redirect: null,
  };

  componentDidMount() {
    this.loadFavSongs();
  }

  getProfile = () => {
    axios.get("/user/profile?email=" + this.state.userEmail, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("got profile " + this.state.userEmail);
        console.log(res.data);
        console.log("user id: " + res.data.userId);
        this.setState({
          userProfile: res.data,
          userId: { userId: res.data.userId }
        })
        console.log("profile " + this.state.userProfile.playLists)

      })
      .catch(err => {
        console.log(err);
      })

      this.loadFavSongs()
  }

  registerHandler = (user) => {
    axios
      .post("/user/registration", user)
      .then((response) => {
        console.log(response);
        this.setState({
          successMessage: "Successfully registered !!!",
          failedMessage: null,
          redirect: "/login"
        })

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
            userEmail: user.sub,
            isAuth: true,
            user: user,
            successMessage: "Successfully logged in!!!",
            failedMessage: null,
            redirect: "/home"
          })
        } else {
          this.setState({
            isAuth: false,
            user: null,
            failedMessage: "Incorrect username or password",
          });
        }
        this.getProfile()

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          failedMessage: "Error Occured. Please try again later!!!",
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
        this.getProfile()
        this.setState({
          successMessage: "The Playlist is added successfully",
          failedMessage: null,
          redirect: "/PlaylistList"
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          successMessage: null,
          failedMessage: "Error Occured. Please try again later!"
        })
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
        console.log("Added!!");
        console.log(res);
        this.loadFavSongs();
        this.setState({
          successMessage: "The Song is added successfully",
          failedMessage: null,
          redirect: "/profile",
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          successMessage: null,
          failedMessage: "Error Occured. Please try again later!"
        })
      })
  }

  handleUnFavorite = (songId) => {
    console.log("unfav clicked !!!!!");

    if (songId != null) {

      axios.delete("/song/delete?id=" + songId, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log("deleted!!")
          console.log(res);
          this.loadFavSongs();
          this.setState({
            failedMessage: "",
            successMessage: "The song deleted successfully"
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            failedMessage: "Error acuured during deleting the song, please try again later!",
            successMessage: ""
          })
        })
    } else {
      this.setState({
        failedMessage: "The song already has deleted",
        successMessage: ""
      })
    }
  }

  handleFavorite = (song) => {
    console.log("fav clicked !!!!!");

    const song1 = {}
    song1["name"] = song.title
    song1["image"] = song.album.cover_big
    song1["mp3Url"] = song.preview
    song1["artistName"] = song.artist.name
    song1["user"] = this.state.userId
    console.log(song1)

    axios.post("/song/add", song1, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Added!!")
        console.log(res);
        this.loadFavSongs();
      })
      .catch(err => {
        console.log(err);
      })
  }

  onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    this.setState({
      isAuth: false,
      user: null,
      successMessage: "Successfully logged out!",
      failedMessage: null,
      redirect: "/home"
    })
  }

  loadFavSongs = () => {
    axios.get("/song/index")
      .then(res => {
        console.log("fav songs loaded");
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          console.log("for loop i: "+i);
          if (res.data[i].user.userId == this.state.userProfile.userId) {
            this.setState({
              favSongs: res.data
            })
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  // loadPlaylist = () => {

  // }

  render() {
    const redirect = (this.state.redirect != null) ?
      <Redirect to={this.state.redirect} /> :
      null;

    const playLists = this.state.userProfile.playLists;

    const failedMessage = this.state.failedMessage ? (
      <Alert variant="danger" transition={Fade} >{this.state.failedMessage}</Alert>
    ) : null;

    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;
    return (
      <Router>
        {redirect}
        {this.state.failedMessage}
        <nav>
          {failedMessage} {successMessage}
          <div>
            <Link to="/home">Home</Link>{" "}
            <Link to="/SongsList">Songs</Link>{" "}
            <Link to="/PlaylistList">Playlists</Link>{" "}
            {this.state.isAuth ? (
              <span>
                <Link to="/AddPlaylist">Add Playlist</Link>{" "}
                <Link to="/AddSong">Add Song</Link>{" "}
                <span className="userlogin">
                  {this.state.user ? "Welcome " + this.state.userEmail : null} {"  "}
                  <Link to="/profile">Profile</Link>{" "}
                  <Link to="/logout" onClick={this.onLogoutHandler}>Logout </Link>{" "}
                </span>
              </span>
            ) : (
                <span>
                  <Link to="/register">Register</Link> {"  "}
                  <Link to="/login">Login</Link> {"  "}
                </span>
              )}

            {" "}
          </div>
        </nav>

        <Route
          path="/home"
          component={() => <Home />}
        ></Route>

        <Route
          path="/SongsList"
          component={() => <SongsList handleFav={this.handleFavorite} isAuth={this.state.isAuth} userId={this.state.userId} />}
        ></Route>

        <Route
          path="/PlaylistList"
          component={
            () => this.state.isAuth ? <PlaylistList playlists={playLists} /> : null}
        ></Route>

        <Route
          path="/AddPlaylist"
          component={() => <AddPlaylist userId={this.state.userId} addPlaylist={this.addPlaylist} />}
        ></Route>

        <Route
          path="/AddSong"
          component={() => <AddSong userId={this.state.userId} addSong={this.addSong} />}
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
          component={() => this.state.isAuth ? <Profile email={this.state.userEmail} getProfile={this.getProfile} favSongs={this.state.favSongs} loadFavSongs={this.loadFavSongs} profile={this.state.userProfile} handleunFav={this.handleUnFavorite} addPlaylist={this.addPlaylist} isAuth={this.state.isAuth} userId={this.state.userId} /> : null}
        ></Route>
      </Router>
    )
  }
}