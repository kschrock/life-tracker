import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import { Card, Grid, Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import formPhoto from "../../assets/form.png"
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient"

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
    }
  }));

export default function Login({ user, setUser, fetchExercises }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })


  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const { data, error} = await apiClient.loginUser({ email: form.email, name: form.name ,password: form.password,})
    if(error) setErrors((e) => ({ ...e, form: error }))
    if(data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
    }  
    fetchExercises()
    setIsProcessing(false)

  }

  return (
    <div className="Login">
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
          <img className="formImage" src={formPhoto} alt="head stick figure"></img>
        <Typography className={classes.text}>Login</Typography>
      <TextField
          required
          name="email"
          id="email-required"
          label="📧 Email"
          variant="outlined"
          value={form.email}
          onChange={handleOnInputChange}
          style = {{width: 519}}
        />
        <TextField
        required
        style = {{width: 519}}
        id="password-required"
        name="password"
        label='Password Required'
        variant="outlined"
        value={form.password}
        onChange={handleOnInputChange}
        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
       )
       }}
      /> 
      <Button disabled={isProcessing} onClick={handleOnSubmit} display="block" className={classes.button} variant="contained" color="primary">
      {isProcessing ? "Loading..." : "Login"}
      </Button>
      </Card>
         </Grid>
         <Typography>Don't have an account? <Link to="/register">Sign up</Link> </Typography>
      </div>
    </form>
    </div>
  )
}
