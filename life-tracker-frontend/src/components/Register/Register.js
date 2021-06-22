import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
import { Card, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import form from "../../assets/form.png"
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
  }
}));


export default function Register() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const handleOnPasswordTextChange = (event) => {
    setPassword(event.target.value);
   // console.log(event.target.value)
  }
  const handleOnUsernameTextChange = (event) => {
    setUsername(event.target.value);
   // console.log(event.target.value)
  }
  const handleOnFirstNameTextChange = (event) => {
    setFirstname(event.target.value);
   // console.log(event.target.value)
  }
  const handleOnLastNameTextChange = (event) => {
    setLastname(event.target.value);
   // console.log(event.target.value)
  }
  const handleOnEmailTextChange = (event) => {
    setEmail(event.target.value);
   // console.log(event.target.value)
  }

  // const handleOnSubmit = () => {
  //   // { ...newTweet, id: oldTweets.length, name: userProfile.name, handle: userProfile.handle }
  //   addTweet({
  //     id: tweet.id,
  //     name: tweet.name, 
  //     handle: tweet.handle,
  //     text: tweet,
  //     comments: tweet.comments,
  //     retweets: tweet.retweets,
  //     likes: tweet.likes,
  //   })
  //   setHidden("False");
  //   // alert(tweet)
  //   setTweet("")
  // }

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
          <img className="formImage" src={form} alt="head stick figure"></img>
        <Typography className={classes.text}>Create an Account</Typography>
      <TextField
          required
          id="email-required"
          label="📧 Email"
          // defaultValue="Enter Username:"
          variant="outlined"
          onChange={handleOnEmailTextChange}
          style = {{width: 519}}
        />
        <TextField
          required
          id="username-required"
          label="Username Required"
          // defaultValue="Enter Username:"
          variant="outlined"
          onChange={handleOnUsernameTextChange}
          style = {{width: 519}}
        />
        <TextField
          required
          id="first-name"
          label="First Name Required"
          // defaultValue="Enter Username:"
          variant="outlined"
          onChange={handleOnFirstNameTextChange}
        />
        <TextField
          required
          id="last-name"
          label="Last Name Required"
          // defaultValue="Enter Username:"
          variant="outlined"
          onChange={handleOnLastNameTextChange}
        />
        <TextField
        required
        style = {{width: 519}}
        id="password-required"
        label='Password Required'
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
      
      <Button display="block" className={classes.button} variant="contained" color="primary"> Sign Up </Button>
      </Card>
         </Grid>
         <Typography>Have an Account? Sign in </Typography>
      </div>
    </form>
  );
}
