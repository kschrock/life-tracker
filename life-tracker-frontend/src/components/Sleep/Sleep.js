import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CreateListSleep from '../CreateListSleep/CreateListSleep';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  background:{
    backgroundColor: "#4D60EF",
    color: "#FFFFFF",
    borderRadius: 25,
  },
  button:{
    borderRadius: 35,
    backgroundColor: "#aaa9ab",
    padding: "6 6px",
    fontSize: "12px",
    bm: "20px"
  },
  custom: {
    textAlign: 'center',
    minWidth: 345,
    borderRadius: 10,
    backgroundColor: "#2CB164",
    color: "#FFFFFF",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: 600 // or 'bold'
  },
  subTitle: {
    color: "#FFFFFF",
    fontSize: 25,
  },
  fontStyle: {
    color: "#FFFFFF",
    width: 10
  },
  timeStamp: {
    fontSize: 15
  }
});

export default function Sleep({ user, sleep }) {
    const classes = useStyles();
   //console.log(excercise)
    return (
        <div>
        {Object.keys(user).length === 0 ?(<h1>No Data since User is not Logged In</h1>)
        :(  <div style={{ width: '100%' }}>
            <Box component="span" display="block" p={1} m={1} className={classes.background}>
            <Typography align="center" className={classNames(classes.backgroundColor)} variant="h1" component="h2">
            Sleep
            </Typography>
            </Box>
            <Box m={3}>
            <Button  component={ Link } to="/sleep/create" className={classes.button} variant="contained" color="primary">Add Sleep</Button>
            </Box>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
          
          <CreateListSleep sleep={sleep}/>
          </Grid>
            </div>
        )}

        </div>
    )
}
