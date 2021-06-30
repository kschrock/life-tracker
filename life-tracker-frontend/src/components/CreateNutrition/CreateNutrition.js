import { Card, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { TextField, Typography } from "@material-ui/core";
import food from "../../assets/formFood.png"
import { Link } from "react-router-dom"
import apiClient from "../../services/apiClient"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function CreateNutrition({ setNutrition }) {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    calories: "",
    image_url: ""
  })


  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    // console.log(event.target.name)
     console.log(event.target.value)
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    //setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))
    const { data, error} = await apiClient.createNutritionForUser({ name: form.name, category: form.category ,quantity: form.quantity, calories: form.calories, image_url: form.image_url})
    if(error) setErrors((e) => ({ ...e, form: error }))
    
    if(data?.excercise){
      setNutrition( oldArray => [...oldArray, ...data.setNutrition]) // this copys old array and adds new data Nutrition
    }  
    //setIsProcessing(false)
  }

  return (
    <div className="CreateNutrition">
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
          <img className="formImage" src={food} alt="head stick figure"></img>
        <Typography className={classes.text}>Record Nutrition</Typography>
      <TextField
          required
          name="name"
          label="Food Name"
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
          <MenuItem value={"Snack"}>Snack</MenuItem>
          <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"Lunch"}>Lunch</MenuItem>
          <MenuItem value={"Dinner"}>Dinner</MenuItem>
        </Select>
      </FormControl>
      </div>
       
      <TextField
          required
          id="quantity"
          type="number"
          name="quantity"
          label="Quantity"
          variant="outlined"
          value={form.quantity}
          onChange={handleOnInputChange}
          style = {{width: 519}}
        />  
      <TextField
          required
          id="calories"
          type="number"
          name="calories"
          label="Calories per Serving"
          variant="outlined"
          value={form.calories}
          onChange={handleOnInputChange}
          style = {{width: 519}}
        />  

     <TextField
          required
          name="image_url"
          label="Image URL"
          variant="outlined"
          value={form.image_url}
          onChange={handleOnInputChange}
          style = {{width: 519}}
        />  
       
      <Button component={ Link } to="/excercise" disabled={isProcessing} onClick={handleOnSubmit} display="block" className={classes.button} variant="contained" color="primary">
      {isProcessing ? "Loading..." : "Save Food"}
      </Button>
      </Card>
         </Grid>
         
      </div>
    </form>
    </div>
  )
}
