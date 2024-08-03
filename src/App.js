import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home';
import Course from './components/Course/Course';
import Assignment from './components/Assignment/Assignment';
import './App.css'
const App = () =>{
  return(
  <Router>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp/>}/> 
        <Route path='/course' element={<Course/>}/>
        <Route path='/task' element={<Assignment/>}/>
      </Routes>
  </Router>
  ) 
}

export default App;
