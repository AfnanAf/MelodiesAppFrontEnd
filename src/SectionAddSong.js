import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// core components
import GridContainer from "./components/Grid/GridContainer.js";
import GridItem from "./components/Grid/GridItem.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardBody from "./components/Card/CardBody.js";
import CardFooter from "./components/Card/CardFooter.js";
import Button from "./components/CustomButtons/Button.js";
import SectionNotifications from './Snackbar/SectionNotifications'

import styles from "./assets/jss/material-kit-react/views/componentsSections/loginStyle";

import { GiMicrophone } from "react-icons/gi";
import { GiLoveSong } from "react-icons/gi";
import { RiFolderMusicLine } from "react-icons/ri";
import { BsImageFill } from "react-icons/bs";

import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionAddSong(props) {
    const classes = useStyles();
    return (
        <div>
            {props.failedMessage ? (
                <SectionNotifications type='failure' message={props.failedMessage}></SectionNotifications>
            ) : null}

            {props.successMessage ? (<SectionNotifications type='success' message={props.successMessage}></SectionNotifications>
            ) : null}

            <div className={classes.section}>
                <div className={classes.container2}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card justify="center">
                                <form className={classes.form}>
                                    <CardHeader style={{ backgroundColor: "#9D319D", color: "white" }} className={classes.cardHeader}>
                                        <p style={{ fontWeight: 400, paddingBottom: 1 + 'em' }}>You couldn't find your song?</p>
                                        <h4 style={{ fontWeight: 400, paddingBottom: 1 + 'em' }}>Add Your Favorite Song</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <span>
                                            <Input
                                                style={{ width: 40 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
                                                placeholder="Song Name..."
                                                id="email"
                                                name="name"
                                                onChange={(e) => props.handleChange(e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                }}
                                            />
                                            <GiLoveSong style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
                                            <Input
                                                style={{ width: 40 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em', marginLeft: 5 + 'px' }}
                                                placeholder="Artist Name..."
                                                id="email"
                                                name="artistName"
                                                onChange={(e) => props.handleChange(e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    autoComplete: "off"
                                                }}
                                            />
                                            <GiMicrophone style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
                                        </span>

                                        <Input
                                            style={{ width: 90 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
                                            placeholder="Mp3 Url..."
                                            id="email"
                                            name="mp3Url"
                                            onChange={(e) => props.handleChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                            }}
                                        />
                                        <RiFolderMusicLine style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

                                        <Input
                                            style={{ width: 90 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
                                            placeholder="Image..."
                                            id="email"
                                            name="image"
                                            onChange={(e) => props.handleChange(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                            }}
                                        />
                                        <BsImageFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />

                                    </CardBody>
                                    <CardFooter style={{ marginTop: 2 + 'em' }} className={classes.cardFooter}>
                                        <Button simple color="primary" size="lg" onClick={props.handleSubmit}>
                                            Add Song
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}
