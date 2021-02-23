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
    userEmail: "",
    userProfile: {},
    userId: {},
    message: null,
    successMessage: null,
  };

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
        console.log("profile "+this.state.userProfile.playLists)

      })
      .catch(err => {
        console.log(err);
      })
  }

  registerHandler = (user) => {
    axios
      .post("/user/registration", user)
      .then((response) => {
        console.log(response);
        this.setState({
          successMessage: "Successfully registered !!!",
          message: null
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
            message: null
          })
        } else {
          this.setState({
            isAuth: false,
            user: null,
            message: "Incorrect username or password",
          });
        }
        this.getProfile()

      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          message: "Error Occured. Please try again later!!!",
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

  onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    this.setState({
      isAuth: false,
      user: null,
      successMessage: "Successfully logged out!",
      message: null

    })
  }

  render() {
    const playLists = this.state.userProfile.playLists;
    return (
      <Router>
        {this.state.message}
        <nav>
          <div>
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
          path="/SongsList"
          component={() => <SongsList isAuth={this.state.isAuth} userId={this.state.userId} />}
        ></Route>

        <Route
          path="/PlaylistList"
          component={
          () =>  <PlaylistList playlists={playLists}/>}
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
          component={() => this.state.isAuth ? <Profile profile={this.state.userProfile} isAuth={this.state.isAuth} userId={this.state.userId} /> : null}
        ></Route>
      </Router>
    )
  }
}