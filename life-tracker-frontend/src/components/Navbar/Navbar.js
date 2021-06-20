import React, { useState } from "react";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import Grid   from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";
import './Navbar.css'; 
import codepath from "../../assets/codepath.svg"
import classNames from 'classnames'; //css and material ui style
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  authButton: {
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: "none",
    color: "#fafafa",
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Montserrat",
    h3: {
      fontSize: 33,
      fontFamily: "Montserrat",
      fontWeight: 300,
      color: "#212121",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center"
    }
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  button:{
    borderRadius: 35,
    backgroundColor: "#0BC18A",
    padding: "6 6px",
    fontSize: "12px"
  }
}));


export default function ButtonAppBar() {
    const classes = useStyles()
  return (
    
      <AppBar position="relative" style={{ background: 'white' }} className="navmenu">
        <Toolbar className="navlink" >
        <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          
            <img src={codepath} alt="logo" />
          
        <Grid item xs={2}>
          <Typography  className={classNames(classes.typography, "test", "topnav-centered")} variant="h5">Activity</Typography> 
        </Grid> 
        <Grid item xs={2}>
          <Typography  className={classNames(classes.typography, "test", "topnav-centered")} variant="h5">Exercise</Typography> 
        </Grid>
        <Grid item xs={2}>
          <Typography  className={classNames(classes.typography, "test", "topnav-centered")} variant="h5">Nutrition</Typography> 
          </Grid>
          <Grid item xs={2}>
          <Typography  className={classNames(classes.typography, "test", "topnav-centered")} variant="h5">Sleep</Typography>
          </Grid>
          <Grid item xs={1}>
          <Button className={classes.button} variant="contained" color="primary">Sign In</Button>
          </Grid>
          <Grid item xs={1}>
          <Button className={classes.button}  variant="contained" color="primary">Register</Button>
          </Grid>
          </Grid>
      </Grid>
      </Grid>
        </Toolbar>
      </AppBar>
         
  
        
  );
}
