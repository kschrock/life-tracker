import React from "react";
import watch from "../../assets/watch.jpeg"
import './Home.css'; 
import { makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 40,
      },
      pos: {
        marginBottom: 12,
      },
}));

export default function Home() {

    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>

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
            <Grid item xs={5} >
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2" align="left" className={classes.title} >
                     LifeTracker
                     </Typography>
                    <Typography variant="h6" component="h2" align="left"  color="textSecondary">
                     Helping you take back control of your world.
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={5} >
                <img className="homeImage" src={watch} alt="logo" />
            </Grid>
            <Grid item xs={1} ></Grid>
      </Grid>
      </div>
    );
  }
  