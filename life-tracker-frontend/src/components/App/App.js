import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import apiClient from "../../services/apiClient"
import Login from "../Login/Login"
import Excercise from "../Excercise/Excercise";
import CreateExcercise from "../CreateExcercise/CreateExcercise";
import Nutrition from "../Nutrition/Nutrition";
import CreateNutrition from "../CreateNutrition/CreateNutrition"
import Sleep from "../Sleep/Sleep";
import CreateSleep from "../CreateSleep/CreateSleep";
import Activity from "../Activity/Activity";

export const URL = process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"

function App() {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [excercise, setExcercise] = useState([])
  const [nutrition, setNutrition] = useState([])
  const [excerciseTotal, setExcerciseTotal] = useState(0)
  const [sleepAverage, setsleepAverage] = useState(0)
  const [sleep, setSleep] = useState([])
  const [dailyCalorieAverage, setDailyCalorieAverage] = useState(0)

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
  const fetchSleep = async () => {
    setIsFetching(true)
    if(user){
    const {data, error } = await apiClient.getSleep()
    if(data) setSleep(data.sleep)
    //console.log(data.excercises)
    if(error) setError(error)
    setIsFetching(false)
  }
  }
  const fetchNutrition = async () => {
    setIsFetching(true)
    if(user){
    const {data, error } = await apiClient.getNutrition()
    if(data) setNutrition(data.nutrition)
    //console.log(data.excercises)
    if(error) setError(error)
    setIsFetching(false)
  }
}

const fetchSumExcercises = async () => {
  setIsFetching(true)
  const { data, error } = await apiClient.getExcercisesTotal()
  //console.log(data.excercises[0].total_time)
  if(data.excercises[0].total_time) setExcerciseTotal(data.excercises[0].total_time)
  if(error) setError(error)
  setIsFetching(false)
}

const fetchAverageSleep = async () => {
  setIsFetching(true)
  const { data, error } = await apiClient.getAverageSleep()
  // console.log(data.sleep[0].avg_difference)
  if(data.sleep[0].avg_difference) setsleepAverage(data.sleep[0].avg_difference)
  if(error) setError(error)
  setIsFetching(false)
}

const fetchAverageCalories = async () => {
  setIsFetching(true)
  const { data, error } = await apiClient.getAverageDailyNutrition()
  // console.log(data.nutrition)
  // console.log(typeof(data.nutrition))
  if(data){
    let sum =0
    data.nutrition.forEach(element => {
      sum += Number(element.avg)
    });
    let averageSum = sum/data.nutrition.length
    if(data.nutrition.length === 0) {
      averageSum = 0
    }
    setDailyCalorieAverage(averageSum)

}
  // if(error) setError(error)
  setIsFetching(false)
}


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
    if(Object.keys(user).length === 0){
      //No user data, so do nothing
    }
    else if(Object.keys(user).length !== 0 && user){
      //check if has data then make data calls
      //console.log(user)
      fetchExercises()
      fetchNutrition()
      fetchSleep()
      fetchSumExcercises()
      fetchAverageSleep()
      fetchAverageCalories()
    }
    }, [user])


 


  const handleLogout = async () => {
    console.log("Logged OUT")
    await apiClient.logoutUser()
    setUser({}) //empty user
    setExcercise([]) //empty excercise list
    setNutrition([])//empty nutrition list
    setsleepAverage(0)
    setExcerciseTotal(0)
    setError(null)
    setSleep([])
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
        <Route path="/login" element={<Login user={user} setUser={setUser} fetchExercises={fetchExercises} fetchSleep={fetchSleep} fetchNutrition={fetchNutrition}/>} />
        <Route path="/excercise" element={<Excercise user={user} excercise={excercise}/>} />
        <Route path="/excercise/create" element={<CreateExcercise  setExcercise={setExcercise} />} />
        <Route path="/nutrition" element={<Nutrition user={user} nutrition={nutrition}/>} />
        <Route path="/nutrition/create" element={<CreateNutrition  setNutrition={setNutrition} />} />
        <Route path="/sleep" element={<Sleep user={user} sleep={sleep} />} />
        <Route path="/sleep/create" element={<CreateSleep  setSleep={setSleep} />} />
        <Route path="/activity" element={<Activity 
        sleepAverage={sleepAverage}
        excerciseTotal={excerciseTotal}
        dailyCalorieAverage={dailyCalorieAverage}
        user={user} />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
