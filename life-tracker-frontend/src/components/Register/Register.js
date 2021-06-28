import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
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


export default function Register({user, setUser}) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // passwordConfirm: "",
  })

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    // if (form.passwordConfirm !== form.password) {
    //   setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
    //   setIsProcessing(false)
    //   return
    // } else {
    //   setErrors((e) => ({ ...e, passwordConfirm: null }))
    // }

    const { data, error} = await apiClient.signupUser({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName})
    if(error) setErrors((e) => ({ ...e, form: error }))
    if(data?.user){
      setUser(data.user)
      apiClient.setToken(data.token)
    }

    setIsProcessing(false)
  
  }

  const handleOnInputChange = (event) => {
    //console.log(event.target.name)
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

 
  return (
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
        <Typography className={classes.text}>Create an Account</Typography>
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
          id="first-name"
          name="firstName"
          label="First Name Required"
          variant="outlined"
          value={form.firstName}
          onChange={handleOnInputChange}
        />
        <TextField
          required
          name="lastName"
          id="last-name"
          label="Last Name Required"
          // defaultValue="Enter Username:"
          variant="outlined"
          value={form.lastName}
          onChange={handleOnInputChange}
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
        // onChange={handleOnPasswordTextChange}
        // defaultValue={"Enter Password:"}
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
      {/* <TextField
        required
        style = {{width: 519}}
        id="confirm-password"
        label='Confirm Password'
        variant="outlined"
        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
        onChange={handleOnPasswordTextChange}
        // defaultValue={"Enter Password:"}
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
      /> */}
      
      <Button disabled={isProcessing} onClick={handleOnSubmit} display="block" className={classes.button} variant="contained" color="primary">
      {isProcessing ? "Loading..." : "Create Account"}
      </Button>
      </Card>
         </Grid>
         <Typography>Have an Account? <Link to="/login">Sign in</Link></Typography>
      </div>
    </form>
  );
}
