import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { formatDateLabel } from "../../utils/format";
import CardList from '../CardList/CardList';

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

export default function Excercise({ user, excercise }) {
    const classes = useStyles();
   //console.log(excercise)
    return (
        <div>
        {Object.keys(user).length === 0 ?(<h1>No Data since User is not Logged In</h1>)
        :(  <div style={{ width: '100%' }}>
            <Box component="span" display="block" p={1} m={1} className={classes.background}>
            <Typography align="center" className={classNames(classes.backgroundColor)} variant="h1" component="h2">
            Excercise
            </Typography>
            </Box>
            <Box m={3}>
            <Button  component={ Link } to="/excercise/create" className={classes.button} variant="contained" color="primary">Add Excercise</Button>
            </Box>
            </div>
        )}
        
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
          {/* {Object.keys(excercise).length === 0 ?(<div></div>)
        :( */}
          <CardList excercise={excercise}/>
         {/* )} */}
    
          </Grid>
        </div>
    )
}

{/* <Card className={classNames(classes.custom)} variant="outlined">
             <CardContent className={classes.cardContentContainer}>
            <Typography align="center" className={classNames(classes.title)} >
             {excercise.excercises[0].name}
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
             {excercise.excercises[0].duration}
             </Typography>
        </Box>
        <Box p={1} bgcolor="#2CB164" borderRadius={10} mb={4}>
            <Typography align="center" className={classNames(classes.subTitle)} >
            Intensity
             </Typography>
             <Typography align="center" className={classNames(classes.subTitle)} >
             {excercise.excercises[0].intensity}
             </Typography>
        </Box>
        <Box justifyContent="center" alignItems="center" p={1} bgcolor="#2CB164" borderRadius={10}>
            <Typography align="center" className={classNames(classes.timeStamp)} >
            {formatDateLabel(excercise.excercises[0].postedAt)}
             </Typography>
        </Box>
        <Box justifyContent="center" alignItems="center" border={1} p={.5} px={1} bgcolor="#2CB164" borderRadius={10}>
            <Typography align="center" className={classNames(classes.subTitle)} >
            {excercise.excercises[0].category}
             </Typography>
        </Box>
        </Box>  
        </CardContent>
    </Card> */}