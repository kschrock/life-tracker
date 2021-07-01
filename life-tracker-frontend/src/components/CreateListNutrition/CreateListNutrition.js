import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { formatDateLabel } from "../../utils/format";

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
    background:{
      backgroundColor: "##1ECBE1",
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
      width: 345,
      borderRadius: 10,
      backgroundColor: "#1ECBE1",
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
    },
    cardMedia: {
      borderRadius: '50%',
      height: 50,
      width: 50
  }
  });


  export default function CreateListNutrition({ nutrition }){
    
    const classes = useStyles();
    return (
      <div>
      <Grid 
       container
       direction="row"
       spacing={10}
       alignItems="center"
       justify="space-evenly">
      {nutrition.map(robot => (
        <Grid key={robot.nutritionId} item >
        <Card key={robot.nutritionId} className={classNames(classes.custom)} variant="outlined">
        <CardContent className={classes.cardContentContainer}>
        <Box  borderRadius={10}>
        <img align="left" src={robot.image_url} alt= {robot.name} className={classes.cardMedia}></img>
       <Typography align="center" className={classNames(classes.title)} >
        {robot.name}
        </Typography>
        </Box>
        <Box
   display="flex"
   flexWrap="wrap"
   p={1}
   // bgcolor="background.paper"
   css={{ maxWidth: 300 }}
   justifyContent = 'space-between'
   borderRadius={10}
 >
   <Box p={1}  borderRadius={10}>
       <Typography align="center" className={classNames(classes.subTitle)} >
       calories
        </Typography>
        <Typography align="center" className={classNames(classes.subTitle)} >
        {robot.calories}
        </Typography>
   </Box>
   <Box p={1}  borderRadius={10} mb={4}>
       <Typography align="center" className={classNames(classes.subTitle)} >
       quantity
        </Typography>
        <Typography align="center" className={classNames(classes.subTitle)} >
        {robot.quantity}
        </Typography>
   </Box>
   <Box justifyContent="center" alignItems="center" p={1}  borderRadius={10}>
       <Typography align="center" className={classNames(classes.timeStamp)} >
       {formatDateLabel(robot.postedAt)}
        </Typography>
   </Box>
   <Box justifyContent="center" alignItems="center" border={1} p={.5} px={1} borderRadius={10}>
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