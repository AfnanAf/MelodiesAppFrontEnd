/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "../components/CustomButtons/Button";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown.js";
import profileImage from "../assets/img/faces/avatar.jpg";

import styles from "../assets/jss/material-kit-react/components/headerLinksStyle";

import { BsPeopleCircle } from "react-icons/bs";

import { useState } from 'react';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  return (
    <div>
      <List className={classes.list} >
        <ListItem className={classes.listItem}>
        </ListItem>

        <ListItem className={classes.listItem}>
          {/* <Button
            color="transparent"
            className={classes.navLink}
          ></Button> */}
          <Link
            style={{ textDecoration: 'none' }}
            color="transparent"
            className={classes.navLink}
            to="/home">Home</Link>{" "}

        </ListItem>

        <ListItem className={classes.listItem}>

          <Link
            style={{ textDecoration: 'none' }}
            color="transparent"
            className={classes.navLink}
            to="/SongsList">Songs</Link>

        </ListItem>

        {props.isAuth && props.userRole == 'ROLE_ADMIN' ? <ListItem className={classes.listItem}>

          <Link
            style={{ textDecoration: 'none' }}
            color="transparent"
            className={classes.navLink}
            to="/Users">Users</Link>

        </ListItem> : null}

        {props.isAuth ? (
          <span>

            <ListItem className={classes.listItem}>

              <Link
                style={{ textDecoration: 'none' }}
                color="transparent"
                className={classes.navLink}
                to="/PlaylistList">Playlists</Link>

            </ListItem>
            <ListItem className={classes.listItem}>

              <Link
                style={{ textDecoration: 'none' }}
                color="transparent"
                className={classes.navLink}
                to="/AddPlaylist">Add Playlist</Link>

            </ListItem>
            <ListItem className={classes.listItem}>

              <Link
                style={{ textDecoration: 'none' }}
                color="transparent"
                className={classes.navLink}
                to="/AddSong">Add Song</Link>{" "}

            </ListItem>

          </span>
        ) : (
            null
          )}

      </List >
      <span style={{ position: 'absolute', right: 0 }} >
        {!props.isAuth ? (
          <span>
            <ListItem className={classes.listItem}>
              <Link
                style={{ textDecoration: 'none' }}
                color="transparent"
                className={classes.navLink}
                to="/register">Sign Up</Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link
                style={{ textDecoration: 'none' }}
                color="transparent"
                className={classes.navLink}
                to="/login">Sign In</Link>
            </ListItem>
          </span>
        ) :
          (<ListItem className={classes.listItem}>
            <CustomDropdown
              right
              caret={false}
              hoverColor="white"
              dropdownHeader=""
              buttonText={

                <BsPeopleCircle style={{ width: 2.3 + 'em', height: 2.3 + 'em' }} />

              }
              buttonProps={{
                className:
                  classes.navLink + " " + classes.imageDropdownButton,
                color: "transparent",
              }}
              dropdownList={[
                <Link 
                  style={{
                    paddingRight: 120 + 'px',
                    textDecoration: 'none',
                   color:"#5E2984"
                   ,fontWeight:600,
                
                  }}

                  to="/profile">Profile
           </Link>,
                <Link 
                  style={{
                    paddingRight: 120 + 'px',
                    textDecoration: 'none',
                    color:"#5E2984"
                    ,fontWeight:600
                  }}

                  to="/logout" onClick={props.onLogoutHandler}>Sign Out
</Link>]}
            />
          </ListItem>)}
      </span>
    </div>
  );
}
