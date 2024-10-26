import { useState, useEffect } from 'react';
import SignUp from './SignUp.js'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './Components/UserDashboard';
import HomePage from './Components/HomePage';
import './App.css';
import Holding from './DashboardComponents/Holdings';
import Login from './Components/Login';
import Cookies from 'js-cookie';
import SavingGoals from './Components/SavingGoals';
import Protected from './Auth/Protected';
import Logout from './Components/Logout';
function App() {
 



 

  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/holdings/:CustomerID/:AccountID" element={<Holding />} />
          <Route 
            path="/userDashboard" 
            element={
        
                <UserDashboard />
   
            } 
          />

          <Route path ="/SignUp" element={<SignUp />} />
                    
          <Route path="/logout" element={<Logout />} />
        
          <Route 
            path="/savinggoals" 
            element={
   
                <SavingGoals />
 
            } 
          />
        </Routes>
    
      </BrowserRouter>
    </div>
  );
}


export default App;
