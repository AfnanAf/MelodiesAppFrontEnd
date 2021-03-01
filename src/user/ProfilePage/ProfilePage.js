import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";

import profile from "../../assets/img/faces/christian.jpg";

import studio1 from "../../assets/img/examples/studio-1.jpg";
import studio2 from "../../assets/img/examples/studio-2.jpg";
import studio3 from "../../assets/img/examples/studio-3.jpg";
import studio4 from "../../assets/img/examples/studio-4.jpg";
import studio5 from "../../assets/img/examples/studio-5.jpg";
import work1 from "../../assets/img/examples/olu-eletu.jpg";
import work2 from "../../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../../assets/img/examples/clem-onojegaw.jpg";
import FavSong from "../../FavSong";
import NewPassword from "../NewPassword";
import { CardDeck } from "react-bootstrap";

import EditProfile from "../EditProfile";

import styles from "../../assets/jss/material-kit-react/views/profilePage";

import { useState } from 'react';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [hover, setHover] = useState(false);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      {/* <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      /> */}
      <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} />
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
                    <Button onClick={props.editProfile}>Edit Profile</Button>

                  </div>
                </div>

              </GridItem>
            </GridContainer>
            <div className={classes.description}>
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
                    ...(hover ? { color: 'grey' } : { color: 'black' })
                  }}
                  onClick={props.changePasswordForm}>Change Password</a>
                {" "}
              </p>
              {props.isPasswordChange ? (
                <NewPassword
                  path="/NewPassword"
                  userCurrentPassword={props.profile.password}
                  changePasswordHandler={props.changePasswordHandler}
                ></NewPassword>
              ) : null}
            </div>

            {/* <h3 className={classes.title}>Your Favorite Songs</h3>

            <CardDeck>
              {props.songs.map((song, index) => (
                <div key={index}>
                  <FavSong
                    song={song}
                    handleUnFav={props.handleunFav}
                    addPlaylist={props.addPlaylist}
                    isAuth={props.isAuth}
                    playlists={props.playlists}
                    editSong={props.editSong}
                    userId={props.userId}
                    addSong={props.addSong}
                  />
                </div>
              ))}
            </CardDeck> */}




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
                                handleUnFav={props.handleunFav}
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
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
