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
import SectionNotifications from './Snackbar/SectionNotifications'

import styles from "./assets/jss/material-kit-react/views/componentsSections/loginStyle";

import { RiPlayListFill } from "react-icons/ri";
import { BsImageFill } from "react-icons/bs";

import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionAddPlaylist(props) {
    const classes = useStyles();
    return (
        <div>
        <div className={classes.section}>
            <div className={classes.container2} >
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card justify="center">
                            <form className={classes.form}>
                                <CardHeader style={{ backgroundColor: "#9D319D", color: "white" }} className={classes.cardHeader}>
                                    <h4 style={{ fontWeight: 400, paddingBottom: 1 + 'em' }}>Create Your Own Playlist</h4>
                                </CardHeader>
                                <CardBody>
                                    <Input
                                        style={{ width: 90 + '%', marginBottom: 1.5 + 'em', marginTop: 2 + 'em' }}
                                        placeholder="Playlist Name..."
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
                                    <RiPlayListFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
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
                                            autoComplete: "off"
                                        }}
                                    />
                                    <BsImageFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />


                                </CardBody>
                                <CardFooter style={{ marginTop: 2 + 'em' }} className={classes.cardFooter}>
                                    <Button simple color="primary" size="lg" onClick={props.handleSubmit}>
                                        Add Playlist
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
