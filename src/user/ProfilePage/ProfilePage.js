import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax3 from "../../components/Parallax/Parallax3.js";

import profile from "../../assets/img/MelodiesLogo.png";
import FavSong from "../../FavSong";
import NewPassword from "../NewPassword";
import { CardDeck } from "react-bootstrap";

import EditProfile from "../EditProfile";

import styles from "../../assets/jss/material-kit-react/views/profilePage";

import { useState } from 'react';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

    const editProfileBtnText = props.isProfileEdit ? "Cancel":"Edit Profile";
    const changePasswordText = props.isPasswordChange ? "Cancel":"Change Password";

  return (
    <div>
      <Parallax3 small filter image={require("../../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>

                  <div className={classes.name}>
                    {props.isProfileEdit ? (
                      <EditProfile
                        email={props.email}
                        profile={props.profile}
                        editUserInfo={props.editUserInfo}
                      />
                    )
                      : (
                        <div>
                          <h3 className={classes.title}>{props.profile.firstName} {props.profile.lastName}</h3>
                          <h6>{props.profile.emailAddress}</h6>
                        </div>
                      )}
                    <Button onClick={props.editProfile}>{editProfileBtnText}</Button>

                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div className={classes.description}>
            {props.isPasswordChange ? (
                <NewPassword
                  path="/NewPassword"
                  userCurrentPassword={props.profile.password}
                  changePasswordHandler={props.changePasswordHandler}
                ></NewPassword>
              ) : null}
              <p>
                <a onMouseEnter={() => {
                  setHover(true);
                }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none', color: 'black',
                    ...(hover ? { color: '#9D319D' } : { color: 'black' })
                  }}
                  onClick={props.changePasswordForm}>{changePasswordText}</a>
                {" "}
              </p>
              
            </div>

            <GridContainer justify="center">
              <GridItem className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Songs",
                      tabIcon: Favorite,
                      tabContent: (
                        <CardDeck>
                          {props.songs.map((song, index) => (
                            <div key={index}>
                              <FavSong
                                song={song}
                                handleunFav={props.handleunFav}
                                addPlaylist={props.addPlaylist}
                                isAuth={props.isAuth}
                                playlists={props.playlists}
                                editSong={props.editSong}
                                userId={props.userId}
                                addSong={props.addSong}
                              />
                            </div>
                          ))}
                        </CardDeck>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
