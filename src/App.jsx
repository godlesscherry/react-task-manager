import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskCreationPage from './pages/TaskCreationPage';
import CountdownPage from './pages/CountdownPage';
import './index.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/task-creation" element={<TaskCreationPage />} />
        <Route path="/countdown" element={<CountdownPage />} />
      </Routes>
    </Router>
  );
}

export default App;
