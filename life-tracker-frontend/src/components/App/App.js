import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import apiClient from "../../services/apiClient"
import Login from "../Login/Login"
import Excercise from "../Excercise/Excercise";
import ExcerciseCreate from "../CreateExcercise/CreateExcercise";

export const URL = process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"

function App() {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [excercise, setExcercise] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      setIsFetching(true)
      const { data, error } = await apiClient.fetchUserFromToken()
     // console.log(data)
      if(data) setUser(data.publicUser)
      if(error) setError(error)

      setIsFetching(false)
    }

    const token = localStorage.getItem("life_tracker_token")
    // console.log("here:,", token)
    if(token){
      //console.log("made it here")
      apiClient.setToken(token)
      fetchUser()
    }
    
  }, [])

  useEffect(() => {
    const fetchExercises = async () => {
      setIsFetching(true)
      if(user){
      const {data, error } = await apiClient.getExcercises()
      if(data) setExcercise(data.excercises)
      //console.log(data.excercises)
      if(error) setError(error)
      setIsFetching(false)
    }
    }
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    setIsFetching(true)
    if(user){
    const {data, error } = await apiClient.getExcercises()
    if(data) setExcercise(data.excercises)
    //console.log(data.excercises)
    if(error) setError(error)
    setIsFetching(false)
  }
  }

  const handleLogout = async () => {
    console.log("Logged OUT")
    await apiClient.logoutUser()
    setUser({}) //empty user
    setExcercise([]) //empty excercise list
    setError(null)
    //console.log(user)
  }

  
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar user={user} handleLogout={handleLogout} />

     <Routes>
        <Route path="/" element={<Home
        user={user}
        error={error}
        isFetching={isFetching}
        />} />
        <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login user={user} setUser={setUser} fetchExercises={fetchExercises}/>} />
        <Route path="/excercise" element={<Excercise user={user} excercise={excercise}/>} />
        <Route path="/excercise/create" element={<ExcerciseCreate user={user} setUser={setUser} fetchExercises={fetchExercises}/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
