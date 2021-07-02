import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { round } from "../../utils/format";
const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  background:{
    color: "#2A4147",
    borderRadius: 25,
    fontSize:30
  },
  custom: {
    textAlign: 'center',
    minWidth: 360,
    minHeight: 220,
    borderRadius: 10,
    backgroundColor: "#2CB164",
    color: "#FFFFFF",
  },
  title: {
    color: "#000000",
    fontSize: 40,
    fontWeight: 'bold' // or 'bold'
  },
  subtitle: {
    color: "#FFFFF",
    fontSize: 20,
    fontWeight: 'bold', // or 'bold'
  },
  addMargin:{
      marginTop: 80,
      marginLeft: 150,
      marginRight: 150
  },
  sleepButton:{
    border:"2px solid",
    borderColor: "#4D61F0",
    color: "#4D61F0",
    fontWeight: 'bold'
  },
  sleep:{
    background: "#4D61F0",
  },
  exerciseButton:{
    border:"2px solid",
    borderColor: "#FFAA06",
    color: "#FFAA06",
    fontWeight: 'bold'
  },
  excercise:{
    background: "#FFAA06",
  },
  nutritionButton:{
    border:"2px solid",
    borderColor: "#03C4D0",
    color: "#03C4D0",
    fontWeight: 'bold'
  },
  nutrition:{
    background: "#03C4D0",
  },
  cardValue: {
      fontSize:60,
      fontWeight: 'bold',
      color:"#FFFFF"
  }
});

export default function Activity({ user, excerciseTotal, sleepAverage, dailyCalorieAverage }) {
    const classes = useStyles();
    
    return (
        <div style={{ width: '100%'}}>
        {Object.keys(user).length === 0 ?(<h1>No Data since User is not Logged In</h1>)
        :(   <div className={classNames(classes.addMargin)}>
            
            <Box component="span" display="flex" p={1} m={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1} >
                <Typography align="left" className={classNames(classes.title)} variant="h1" component="h2">
                Activity Feed
                </Typography>
            </Box>
            <Box p={1} >
                <Button  component={ Link } to="/excercise/create" className={classNames(classes.exerciseButton)} variant="outlined" >Add Excercise</Button>
            </Box>
            <Box p={1} >
                <Button  component={ Link } to="/sleep/create"className={classNames(classes.sleepButton)} variant="outlined" >Log Sleep</Button>
            </Box>
            <Box p={1} >
                <Button  component={ Link } to="/nutrition/create" className={classNames(classes.nutritionButton)} variant="outlined">Record Nutrition</Button>
            </Box>
            </Box>

            <Grid 
            container
            direction="row"
            spacing={3}
            alignItems="center"
            justify="space-evenly">
            <Grid key={1} item >
                <Card className={classNames(classes.custom, classes.excercise)} variant="outlined">
                <Box
                display="block"
                flexWrap="wrap"
                p={3}
                // bgcolor="background.paper"
                css={{ maxWidth: 300 }}
                justifyContent = 'space-between'
                borderRadius={10}
                >
                    <Box p={1}  borderRadius={10} mb={4}>
                        <Typography  align="left" className={classNames(classes.subtitle)} >
                        Total Exercise Minutes
                        </Typography>
                    </Box>
                    <Box p={1}  borderRadius={10} mb={4}>
                        <Typography variant="h1" align="left" className={classNames(classes.cardValue)} >
                            {excerciseTotal}
                        </Typography>
                    </Box>
                    </Box>
                </Card>
            </Grid>
            <Grid key={2} item >
            <Card className={classNames(classes.custom, classes.sleep)} variant="outlined">
                <Box
                display="block"
                flexWrap="wrap"
                p={3}
                // bgcolor="background.paper"
                css={{ maxWidth: 300 }}
                justifyContent = 'space-between'
                borderRadius={10}
                >
                    <Box p={1} borderRadius={10} mb={4}>
                        <Typography  align="left" className={classNames(classes.subtitle)} >
                        Avg Sleep Hours
                        </Typography>
                    </Box>
                    <Box p={1} borderRadius={10} mb={4}>
                        <Typography variant="h1" align="left" className={classNames(classes.cardValue)} >
                            {sleepAverage}
                        </Typography>
                    </Box>
                    </Box>
                </Card>
            </Grid>
            <Grid key={3} item >
            <Card className={classNames(classes.custom, classes.nutrition)} variant="outlined">
                <Box
                display="block"
                flexWrap="wrap"
                p={3}
                // bgcolor="background.paper"
                css={{ maxWidth: 300 }}
                justifyContent = 'space-between'
                borderRadius={10}
                >
                    <Box p={1}  borderRadius={10} mb={4}>
                        <Typography  align="left" className={classNames(classes.subtitle)} >
                        Avg Daily Calories
                        </Typography>
                    </Box>
                    <Box p={1}  borderRadius={10} mb={4}>
                        <Typography variant="h1" align="left" className={classNames(classes.cardValue)} >
                            {round(dailyCalorieAverage,2)}
                        </Typography>
                    </Box>
                    </Box>
                </Card>
            </Grid>
          
          </Grid>
            </div>
            
        )}
        
        </div>
    )
}
