import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import Clearfix from "../components/Clearfix/Clearfix.js";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import styles from "../assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";
import {FiAlertCircle} from 'react-icons/fi'
const useStyles = makeStyles(styles);

export default function SectionNotifications(props) {
  const classes = useStyles();
  return (
    <div className={classes.section} id="notifications" style={{marginTop:0+"em"}}>
      
      {props.type == 'success'? (  <SnackbarContent
        message={
          <span>
            <b>SUCCESS ALERT:</b> {props.message}
          </span>
        }
        close
        color="success"
        icon={Check}
      />):null}

{props.type == 'failure'? (<SnackbarContent 
        message={
          <span>
            <b>DANGER ALERT:</b> {props.message}
          </span>
        }
        close
        color="danger"
         icon={InfoOutlinedIcon}
      />):null}
      {/* <SnackbarContent
        message={props.message
        }
        close
        color="info"
        icon="info_outline"
      /> */}
{/*     
      <SnackbarContent
        message={
          <span>
            <b>WARNING ALERT:</b> You{"'"}ve got some friends nearby, stop
            looking at your phone and find them...
          </span>
        }
        close
        color="warning"
        icon={Warning}
      /> */}
     
      <Clearfix />
    </div>
  );
}
