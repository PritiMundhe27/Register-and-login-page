import React from 'react';
import './App.css';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OtpVerification  from './OtpVerification';
import Login from './Login';

function App() {
  return (
    <div className='main'> 
    <Router>
    <Routes>
      <Route exact path="/" element={<Register />}  />
      <Route path="/otpVerification" element={<OtpVerification />} />
      <Route path="/Login" element={<Login/>}></Route>
      </Routes>
  </Router>
  </div>
  );
}

export default App;
