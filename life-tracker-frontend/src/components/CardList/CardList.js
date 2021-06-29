import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { formatDateLabel } from "../../utils/format";

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
    background:{
      backgroundColor: "#2CB164",
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


  export default function CardList({ excercise }){
 
    const classes = useStyles();
    return (
      <div>
      <Grid 
       container
       direction="row"
       spacing={10}
       alignItems="center"
       justify="space-evenly">
      {excercise.map(robot => (
        <Grid key={robot.excerciseId} item >
        <Card key={robot.excerciseId} className={classNames(classes.custom)} variant="outlined">
        <CardContent className={classes.cardContentContainer}>
       <Typography align="center" className={classNames(classes.title)} >
        {robot.name}
        </Typography>
        <Box
   display="flex"
   flexWrap="wrap"
   p={1}
   // bgcolor="background.paper"
   css={{ maxWidth: 300 }}
   justifyContent = 'space-between'
   borderRadius={10}
 >
   <Box p={1} bgcolor="#2CB164" borderRadius={10}>
       <Typography align="center" className={classNames(classes.subTitle)} >
        Duration
        </Typography>
        <Typography align="center" className={classNames(classes.subTitle)} >
        {robot.duration}
        </Typography>
   </Box>
   <Box p={1} bgcolor="#2CB164" borderRadius={10} mb={4}>
       <Typography align="center" className={classNames(classes.subTitle)} >
       Intensity
        </Typography>
        <Typography align="center" className={classNames(classes.subTitle)} >
        {robot.intensity}
        </Typography>
   </Box>
   <Box justifyContent="center" alignItems="center" p={1} bgcolor="#2CB164" borderRadius={10}>
       <Typography align="center" className={classNames(classes.timeStamp)} >
       {formatDateLabel(robot.postedAt)}
        </Typography>
   </Box>
   <Box justifyContent="center" alignItems="center" border={1} p={.5} px={1} bgcolor="#2CB164" borderRadius={10}>
       <Typography align="center" className={classNames(classes.subTitle)} >
       {robot.category}
        </Typography>
   </Box>
   </Box>  
   </CardContent>
</Card>
</Grid>
    ))}
    </Grid>
    </div>

    )
  
  }