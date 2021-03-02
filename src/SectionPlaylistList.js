import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Parallax2 from "./components/Parallax/Parallax2.js";
import { CardDeck } from "react-bootstrap";
import Playlist from "./Playlist";

import classNames from "classnames";

import styles from "./assets/jss/material-kit-react/views/profilePage";

const useStyles = makeStyles(styles);

export default function SectionRegister(props) {
  const classes = useStyles();

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
                    {!props.isDetail ? (
                      props.playlists.map((playlist, index) => (
                        <div key={index} >
                          <Playlist
                            editPlaylist={props.editPlaylist}
                            deletePlaylist={props.deletePlaylist}
                            playlist={playlist}
                            key={index}
                            userId={props.userId}
                            isDetail={props.isDetail}
                            clickedPlaylist={props.clickedPlaylist}
                            goToDetail={props.goToDetail}
                            goBack={props.goBack}

                          />
                        </div>
                      ))
                    ) :
                      (
                        <Playlist
                          editPlaylist={props.editPlaylist}
                          deletePlaylist={props.deletePlaylist}
                          playlist={props.clickedPlaylist}

                          userId={props.userId}
                          isDetail={props.isDetail}
                          goToDetail={props.goToDetail}
                          goBack={props.goBack}

                        />
                      )
                    }
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
