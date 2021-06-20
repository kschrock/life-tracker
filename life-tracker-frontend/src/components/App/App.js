import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';

export const URL = process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001"

function App() {


  return (
    <div className="App">
      <Navbar />
     <BrowserRouter>

     <Routes>
        <Route path="/" element={<Home/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
