import { Card, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { TextField, Typography } from "@material-ui/core";
import sleep from "../../assets/sleep.png"
import { Link } from "react-router-dom"
import apiClient from "../../services/apiClient"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    card: {
      width: "40%",
      backgroundColor: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      padding: '30px',
      border: "2px solid",
      borderRadius: 25,
      marginBottom: 10,
    },
    button:{
      background: "#2CB164",
      width: 519,
    },
    text:{
      color: "#2CB164",
      fontSize: 35,
      fontWeight:"bold"
    },
    drawerWidth: {
      width: 519,
      [theme.breakpoints.up(780)]: {
        width: 300
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));

export default function CreateSleep({ setSleep }) {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    start_time: "",
    end_time: ""
  })

  const handleOnInputChange = (event) => {
    // console.log(event.target.name)
   //  console.log(event.target.value)
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    //setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))
    const { data, error} = await apiClient.createSleepForUser({ start_time: form.start_time, end_time: form.end_time })
    if(error) setErrors((e) => ({ ...e, form: error }))
    
    if(data?.sleep){
      setSleep( oldArray => [...oldArray, ...data.sleep]) // this copys old array and adds new data Nutrition
    }  
    //setIsProcessing(false)
  }

  return (
    <div className="CreateSleep">
      <form className={classes.root} noValidate autoComplete="off">
      <div className="moveFormDown">
      <Grid container 
      className={classes.root}
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      >
        <Card className={classes.card}>
          <img className="formImage" src={sleep} alt="head stick figure"></img>
        <Typography className={classes.text}>Record Sleep</Typography>
      
       
      <TextField
        id="start_time"
        label="Start Sleep"
        type="datetime-local"
        variant="outlined"
        name="start_time"
        style = {{width: 519}}
        onChange={handleOnInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

       <TextField
        id="end_time"
        label="End Sleep"
        type="datetime-local"
        variant="outlined"
        name="end_time"
        style = {{width: 519}}
        onChange={handleOnInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        
       
      <Button component={ Link } to="/sleep" disabled={isProcessing} onClick={handleOnSubmit} display="block" className={classes.button} variant="contained" color="primary">
      {isProcessing ? "Loading..." : "Save Sleep"}
      </Button>
      </Card>
         </Grid>
         
      </div>
    </form>
    </div>
  )
}
