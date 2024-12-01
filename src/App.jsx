import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import TaskCreationPage from './pages/TaskCreationPage';
import CountdownPage from './pages/CountdownPage';
import { selectIsLoggedIn } from './store/userSlice'; // Import the login selector

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Fetch login state from Redux

  return (
    <Router>
      <Routes>
        {/* Redirect '/' to task-creation if logged in, else show LoginPage */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/task-creation" /> : <LoginPage />}
        />
        {/* Prevent unauthorized access to task-creation */}
        <Route
          path="/task-creation"
          element={isLoggedIn ? <TaskCreationPage /> : <Navigate to="/" />}
        />
        {/* Prevent unauthorized access to countdown */}
        <Route
          path="/countdown"
          element={isLoggedIn ? <CountdownPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
