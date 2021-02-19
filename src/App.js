import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import SongsList from './SongsList'

export default class App extends Component {
  render() {
    return (
      <Router>
         <nav>
          <div>
            <Link to="/SongsList">Songs</Link>{" "}
          </div>
        </nav>
        <Route
          path="/SongsList"
          component={() => <SongsList />}
        ></Route>
      </Router>
    )
  }
}