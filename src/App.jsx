// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WeeklySchedule from './pages/WeeklySchedule';
import CreateEvent from './pages/CreateEvent';
import './themes.css';
import { gapi } from 'gapi-script';

const CLIENT_ID = "076279161081-kd5q48v9bbqplc6unp5l4dn7m3f02d2u.apps.googleusercontent.com";
const API_KEY = "eventplanner-444206";
const SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize Google API
  useEffect(() => {
    function start() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        });
      });
    }
    start();
  }, []);

  // OAuth Sign-In
  const handleSignIn = async () => {
    try {
      const auth = gapi.auth2.getAuthInstance();
      await auth.signIn();
      const userProfile = auth.currentUser.get().getBasicProfile();
      setUser({
        name: userProfile.getName(),
        email: userProfile.getEmail(),
        imageUrl: userProfile.getImageUrl(),
      });
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  // Add Event to Google Calendar
  const createCalendarEvent = async () => {
    try {
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: 'New Event',
          description: 'Event created from React App',
          start: {
            dateTime: new Date().toISOString(),
            timeZone: 'America/New_York',
          },
          end: {
            dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: 'America/New_York',
          },
        },
      });
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event", error);
    }
  };

  // Persist dark mode preference
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

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <Router>
      <Header 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
        handleSignIn={handleSignIn} 
        user={user} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weekly-schedule" element={<WeeklySchedule />} />
        <Route path="/create-event" element={<CreateEvent createEvent={createCalendarEvent} />} />
      </Routes>
    </Router>
  );
};

export default App;
