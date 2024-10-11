
//IMORT YOUR COMPONENTS HERE
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
//IMPORT REACT
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
//IMPORT CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Analytics from './components/Analytics/Analytics';

//IMPORT FONT
import '@fontsource/inter';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {/* Route for Dashboard when logged in */}
          {isLoggedIn ? (
            <>
              <Route path="/Admin" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </>
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
