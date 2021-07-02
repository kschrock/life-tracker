import { Card, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { TextField, Typography } from "@material-ui/core";
import workout from "../../assets/workout.png"
import { Link } from "react-router-dom"
import apiClient from "../../services/apiClient"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Autocomplete from '@material-ui/lab/Autocomplete';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


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
  }));

export default function ExcerciseCreate({ setExcercise }) {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: "",
    category: "",
    duration: "",
    intensity: "",
  })
  var out = new Array(10).fill(1).map(function(val, index){
    return {
      "num": index+1,
    }
  });

  var oneHundred = new Array(120).fill(1).map(function(val, index){
    return {
      "num": index+1,
    }
  });

  const oneHundredProps = {
    options: oneHundred,
    getOptionLabel: (option) => String(option.num)? String(option.num) : '',
  };

  const tenProps = {
    options: out,
    getOptionLabel: (option) => String(option.num)? String(option.num) : '',
  };

  const handleClick = (event,newValue) => {
     let formName = ""
     if(event.target.id.includes("intensity")) formName = "intensity"
     if(event.target.id.includes("duration")) formName = "duration"
     if (newValue !== null){
     setForm((f) => ({ ...f, [formName]: newValue.num}))
     //console.log(event.target.id)
     }
     else{
      setForm((f) => ({ ...f, [formName]: ''}))
     }
    // setInputValue(top100Films[0]);
 };

  //console.log(form)

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    // console.log(event.target.name)
    // console.log(event.target.value)
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    //setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))
    const { data, error} = await apiClient.createExcerciseForUser({ name: form.name, category: form.category ,duration: form.duration, intensity: form.intensity})
    if(error) setErrors((e) => ({ ...e, form: error }))
    
    if(data?.excercise){
      setExcercise( oldArray => [...oldArray, ...data.excercise]) // this copys old array and adds new data excercise
    }  
    //setIsProcessing(false)
  }

  return (
    <div className="CreateExcercise">
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
          <img className="formImage" src={workout} alt="head stick figure"></img>
        <Typography className={classes.text}>Add Excercise</Typography>
      <TextField
          required
          name="name"
          label="Excercise Name"
          variant="outlined"
          value={form.name}
          onChange={handleOnInputChange}
          style = {{width: 519}}
        />
       <div display="block">
       <FormControl  variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={form.category}
          onChange={handleOnInputChange}
          label="category"
          name="category"
        >
          <MenuItem value={"Endurance"}>Endurance</MenuItem>
          <MenuItem value={"Strength"}>Strength</MenuItem>
          <MenuItem value={"Flexibility"}>Flexibility</MenuItem>
          <MenuItem value={"Balance"}>Balance</MenuItem>
        </Select>
      </FormControl>
      </div>
        <Autocomplete
        {...tenProps}
        getOptionSelected={(option, value) => option.value === value.value}
        id="intensity"
        selectOnFocus
        onChange={(event, newValue) => handleClick(event,newValue)} 
        renderInput={(params) => <TextField variant="outlined" {...params} label="Intensity" margin="normal" />}
      />
      <Autocomplete
        {...oneHundredProps}
        getOptionSelected={(option, value) => option.value === value.value}
        id="duration"
        selectOnFocus
        onChange={(event, newValue) => handleClick(event,newValue)} 
        renderInput={(params) => <TextField variant="outlined" {...params} label="Duration *in minutes" margin="normal" />}
      />
       
      <Button component={ Link } to="/excercise" disabled={isProcessing} onClick={handleOnSubmit} display="block" className={classes.button} variant="contained" color="primary">
      {isProcessing ? "Loading..." : "Create Excercise"}
      </Button>
      </Card>
         </Grid>
         
      </div>
    </form>
    </div>
  )
}
