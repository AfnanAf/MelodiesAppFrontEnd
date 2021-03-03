import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";

// import styles from "../assets/jss/material-kit-react/views/componentsSections/loginStyle";
import styles from "../assets/jss/material-kit-react/views/profilePage";

import Parallax2 from "../components/Parallax/Parallax2.js";

import classNames from "classnames";

import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionLogin(props) {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: '#FAFAE2' }}>
      
      <Parallax2 style={{ height: 10 + 'em', }} small filter image={require("../assets/img/profile-bg.jpg")} />

      <div style={{ paddingTop: 3 + 'em', height: 40 + 'em', backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120_1280.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom' }} className={classNames(classes.main, classes.mainRaised)}>

        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5}>
                <div className={classes.profile}>

                  <Card>
                    <form className={classes.form}>
                      <CardHeader style={{ backgroundColor: "#9D319D", color: "white" }} className={classes.cardHeader}>
                        <h4 style={{ fontWeight: 400, paddingBottom: 1 + 'em' }}>Sign In</h4>
                      </CardHeader>
                      <CardBody>
                        <Input
                          style={{ width: 90 + '%', marginBottom: 2 + 'em', marginTop: 2 + 'em' }}
                          placeholder="Email..."
                          id="email"
                          name="emailAddress"
                          onChange={(e) => props.changeHandler(e)}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        />
                        <MdEmail style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
                        <Input
                          style={{ width: 90 + '%', marginBottom: 2 + 'em', marginTop: 2 + 'em' }}
                          placeholder="Password"
                          id="pass"
                          name="password"
                          onChange={(e) => props.changeHandler(e)}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off"
                          }}
                        />
                        <BsFillLockFill style={{ width: 1.5 + 'em', height: 1.5 + 'em' }} />
                      </CardBody>
                      <CardFooter style={{ marginTop: 2 + 'em' }} className={classes.cardFooter}>
                        <Button style={{ margin: 'auto auto' }} simple color="primary" size="lg" onClick={props.loginHandler}>
                          Sign In
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
