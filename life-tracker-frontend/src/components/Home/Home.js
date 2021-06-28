import React from "react";
import watch from "../../assets/watch.jpeg"
import food from "../../assets/food.jpeg"
import fitness from "../../assets/fitness.jpeg"
import rest from "../../assets/rest.jpeg"
import planner from "../../assets/planner.jpg"
import './Home.css'; 
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'; //css and material ui style
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginBottom: 100,
      },
      title: {
        fontSize: 70,
        fontWeight: "900",
      },
      subTitle: {
          fontSize:27
      },
      pos: {
        marginBottom: 12,
      },
      custom: {
        border: "none",
        boxShadow: "none",
      },
      cardContainer:{
        marginTop: 100,
        marginBottom: 100,
      },
      bottomCards: {
        textAlign: 'center',
        maxWidth: 345,
        border: "none",
        // width: 300,
        
      },
      cardTitle: {
          padding:0,
          textAlign: "center"
      },
      removePadding: {
          padding: 0
      },
      Media: {
        height: 250,
        width: '100%',
        objectFit: 'cover',
        borderRadius: 25
      },
}));

export default function Home({user}) {

  const location = useLocation()

  useEffect(() => {
    // some silly react router magic to get hash links to work
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [location.hash])

    const classes = useStyles()

    return (
      <div style={{ marginTop: 100 }}>
        <Grid
         container
         direction="row"
         alignContent="center"
         alignItems="center"
         wrap="wrap"
         >
            <Grid item xs={1} ></Grid>
            <Grid item xs={4} >
            <Card className={classNames(classes.root, classes.custom)} variant="outlined">
                <CardContent className={classes.cardContentContainer}>
                    <Typography align="left" className={classNames(classes.title, "title-font")} >
                     LifeTracker 
                     </Typography>
                    <Typography variant="h6" component="h2" align="left"  className={classNames(classes.subTitle)} color="textSecondary">
                     Helping you take back control of your world.
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={1} ></Grid>
            <Grid item xs={4} >
                <img className="homeImage" src={watch} alt="logo" />
            </Grid>
            <Grid item xs={1} ></Grid>
      </Grid>

      <Grid
         container
         direction="row"
         alignContent="center"
         alignItems="center"
         justify="space-evenly"
         wrap="wrap"
         className={classes.cardContainer}
         >
            <Grid item xs={2} >
            <Card className={classNames( classes.custom, classes.bottomCards)} variant="outlined">
                <Typography align="center">
                    Fitness ♥
                 </Typography>
                <img className={classes.Media} src={fitness} alt="logo" />
            </Card>
            </Grid>
            <Grid item xs={2} >
            <Card className={classNames( classes.custom, classes.bottomCards)} variant="outlined">
                <Typography align="center">
                     Food &#127822;
                 </Typography>
                <img className={classes.Media} src={food} alt="logo" />
            </Card>
            </Grid>
            <Grid item xs={2} >
            <Card className={classNames(classes.custom, classes.bottomCards)} variant="outlined">
                 <Typography align="center">
                     Rest 🕒
                 </Typography>
                <img className={classes.Media} src={rest} alt="logo" />
            </Card>
            </Grid>
            <Grid item xs={2} >
            <Card className={classNames(classes.custom, classes.bottomCards)} variant="outlined">
                 <Typography align="center">
                     Planner 📅
                 </Typography>
                <img className={classes.Media} src={planner} alt="logo" />
            </Card>
            </Grid>

         </Grid>
      </div>
    );
  }
  