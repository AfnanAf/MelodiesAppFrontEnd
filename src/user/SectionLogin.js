import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";
import CustomInput from "../components/CustomInput/CustomInput.js";

import styles from "../assets/jss/material-kit-react/views/componentsSections/loginStyle";

import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionLogin(props) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4 style={{ fontWeight: 400, paddingBottom: 1 + 'em' }}>Login</h4>
                </CardHeader>
                <CardBody>
                  {/* <CustomInput
                    labelText="First Name..."
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  /> */}
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
                  <Button simple color="primary" size="lg" onClick={props.loginHandler}>
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
