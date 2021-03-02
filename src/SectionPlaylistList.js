import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardBody from "./components/Card/CardBody.js";
import CardFooter from "./components/Card/CardFooter.js";
import Button from "./components/CustomButtons/Button.js";
import CustomInput from "./components/CustomInput/CustomInput.js";
import Parallax2 from "./components/Parallax/Parallax2.js";
import { Alert, CardDeck } from "react-bootstrap";
import Playlist from "./Playlist";

import classNames from "classnames";

// import styles from "../assets/jss/material-kit-react/views/componentsSections/loginStyle";
import styles from "./assets/jss/material-kit-react/views/profilePage";

import { useState } from "react";

import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";

import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionRegister(props) {
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
    <div style={{ backgroundColor: "#FAFAE2" }}>
      <Parallax2
        style={{
          height: 10 + "em",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
        small
        filter
        image={require("./assets/img/profile-bg.jpg")}
      />

      <div
        style={{
          paddingTop: 3 + "em",
          backgroundColor: "#FAFAE2",
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120_1280.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem  >
                <div className={classes.profile} style={{ height: 40 + "em" }}>
                    <CardDeck >
                      {props.playlists.map((playlist, index) => (
                        <div key={index} >
                          <Playlist
                            editPlaylist={props.editPlaylist}
                            deletePlaylist={props.deletePlaylist}
                            playlist={playlist}
                            key={index}
                            userId={props.userId}
                           
                          />
                        </div>
                      ))}
                    </CardDeck>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
