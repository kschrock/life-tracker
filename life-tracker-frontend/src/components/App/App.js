import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Register from '../Register/Register';

export const URL = process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"

function App() {


  return (
    <div className="App">
     <BrowserRouter>
        <Navbar />

     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
