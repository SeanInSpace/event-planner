// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WeeklySchedule from './pages/WeeklySchedule';
import CreateEvent from './pages/CreateEvent';
import './themes.css';


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persist dark mode preference using localStorage
  useEffect(() => {
    const darkModePreference = localStorage.getItem('isDarkMode');
    if (darkModePreference) {
      setIsDarkMode(JSON.parse(darkModePreference));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weekly-schedule" element={<WeeklySchedule />} />
        <Route path="/create-event" element={<CreateEvent />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
