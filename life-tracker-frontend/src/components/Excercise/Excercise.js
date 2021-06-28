import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames'; //css and material ui style
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    fontSize: "12px"
  }
});

export default function Excercise({ user, setUser, excercise }) {
    const classes = useStyles();
    console.log(user)
    return (
        <div>
        {Object.keys(user).length === 0 ?(<h1>No Data since User is not Logged In</h1>)
        :(  <div style={{ width: '100%' }}>
            <Box component="span" display="block" p={1} m={1} className={classes.background}>
            <Typography align="center" className={classNames(classes.backgroundColor)} variant="h1" component="h2">
            Excercise
            </Typography>
            </Box>
            <Button component={ Link } to="/excercise/create" className={classes.button} variant="contained" color="primary">Add Excercise</Button>
            </div>
        )}

        </div>
    )
}