import axios from 'axios'
import { decode } from 'jsonwebtoken'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import AddPlaylist from './AddPlaylist'
import AddSong from './AddSong'
import PlaylistList from './PlaylistList'
import SongsList from './SongsList'
import Login from './user/Login'
import Profile from './user/Profile'
import Register from './user/Register'
import { Redirect } from "react-router-dom";
import Home from './Home'
import UsersList from './user/UsersList'
import Header from "./Header/Header.js";
import HeaderLinks from "./Header/HeaderLinks.js";
import SectionNotifications from './Snackbar/SectionNotifications'
import Footer from './components/Footer/Footer'
import MelodiesLogo from "../src/assets/img/MelodiesLogo.png";

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
    users: []
  };

  componentDidMount() {
    this.loadFavSongs();
  }

  getProfile = () => {
    axios.get(`${process.env.REACT_APP_Back_END_URL}/user/profile?email=` + this.state.userEmail, {
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
      .post(`${process.env.REACT_APP_Back_END_URL}/user/registration`, user)
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
  }

  loginHandler = (user) => {
    axios
      .post(`${process.env.REACT_APP_Back_END_URL}/user/login`, user)
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
            successMessage: "Successfully logged in",
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
        this.getUsers()
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          failedMessage: "Error Occured. Please try again later!!!",
        })
      });
  }

  addPlaylist = (playlist) => {
    axios.post(`${process.env.REACT_APP_Back_END_URL}/playlist/add`, playlist, {
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
    axios.post(`${process.env.REACT_APP_Back_END_URL}/song/add`, song, {
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

  editSong = (song) => {
    axios.put(`${process.env.REACT_APP_Back_END_URL}/song/edit`, song, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("Edited!!");
        console.log(res);
        this.loadFavSongs();
        this.setState({
          successMessage: "The Song is edited successfully",
          failedMessage: null,
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
      axios.delete(`${process.env.REACT_APP_Back_END_URL}/song/delete?id=` + songId, {
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

    axios.post(`${process.env.REACT_APP_Back_END_URL}/song/add`, song1, {
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
    axios.get(`${process.env.REACT_APP_Back_END_URL}/song/index`)
      .then(res => {
        console.log("fav songs loaded");
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          console.log("for loop i: " + i);
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

  getUsers = () => {
    axios.get(`${process.env.REACT_APP_Back_END_URL}/user/index`)
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

  loadPlaylists() {
    axios.get(`${process.env.REACT_APP_Back_END_URL}/user/profile?email=` + this.props.email, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("playlists >")
        console.log(res.data)
        this.setState({
          playlists: res.data.playLists
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deletePlaylist = (playlistId) => {
    console.log(playlistId)

    axios.delete(`${process.env.REACT_APP_Back_END_URL}/playlist/delete?id=` + playlistId, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log("playlist deleted !");
        console.log(res.data);
        this.getProfile()
        this.setState({
          successMessage: "playlist is deleted successfully",
          failedMessage: null
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          successMessage: null,
          failedMessage: "Error during deleting a playlist"
        })
      })
  }

  editPlaylist = (playlist) => {
    axios.put(`${process.env.REACT_APP_Back_END_URL}/playlist/edit`, playlist, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data)
        this.getProfile()
        this.setState({
          editedPlaylist: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    const redirect = (this.state.redirect != null) ?
      <Redirect to={this.state.redirect} /> :
      null;

    const playLists = this.state.userProfile.playLists;
    const userRole = this.state.userProfile.userRole;

    const failedMessage = this.state.failedMessage ? (
      <div style={{ marginTop: 3 + 'em' }}>
        <SectionNotifications type='failure' message={this.state.failedMessage}></SectionNotifications></div>
    ) : null;

    const successMessage = this.state.successMessage ? (
      <div style={{ marginTop: 3 + 'em' }}>
        <SectionNotifications type='success' message={this.state.successMessage}></SectionNotifications></div>
   
    ) : null;
    

    return (
      <Router>
        <Header style={{ position: 'sticky', display: 'block' }}
          brand={<img width="60em" height="inherit" src={MelodiesLogo} />}
          leftLinks={<HeaderLinks isAuth={this.state.isAuth} onLogoutHandler={this.onLogoutHandler} userRole={userRole} />}
          color="transparent"
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />

        {redirect}
        {failedMessage} {successMessage}
        
        <Route
          path="/home"
          component={() => <Home />}
        ></Route>

        <Route
          path="/SongsList"
          component={() => <SongsList playlists={playLists} addSong={this.addSong} handleFav={this.handleFavorite} isAuth={this.state.isAuth} userId={this.state.userId} />}
        ></Route>

        <Route
          path="/PlaylistList"
          component={
            () => this.state.isAuth ? <PlaylistList deletePlaylist={this.deletePlaylist} editPlaylist={this.editPlaylist} playlists={playLists} userId={this.state.userId} email={this.state.userEmail} successMessage={this.state.successMessage} /> : null}
        ></Route>

        <Route
          path="/AddPlaylist"
          component={() => <AddPlaylist userId={this.state.userId} addPlaylist={this.addPlaylist} successMessage={this.state.successMessage} />}
        ></Route>

        <Route
          path="/AddSong"
          component={() => <AddSong userId={this.state.userId} addSong={this.addSong}/>}
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
          component={() => this.state.isAuth ? <Profile playlists={playLists} email={this.state.userEmail} getProfile={this.getProfile} favSongs={this.state.favSongs} loadFavSongs={this.loadFavSongs} profile={this.state.userProfile} handleunFav={this.handleUnFavorite} addPlaylist={this.addPlaylist} isAuth={this.state.isAuth} userId={this.state.userId} editSong={this.editSong} addSong={this.addSong} /> : null}
        ></Route>

        <Route
          path="/Users"
          component={() => this.state.isAuth && userRole == 'ROLE_ADMIN' ? <UsersList /> : null}

        ></Route>
        <Footer />

      </Router>
    )
  }
}