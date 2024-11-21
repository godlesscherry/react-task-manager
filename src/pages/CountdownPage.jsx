import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTaskList = location.state?.taskList || []; // Retrieve the passed task list

  const [currentTaskList, setCurrentTaskList] = useState(
    initialTaskList.map((task) => ({
      ...task,
      originalCountdown: task.countdown, // Store original countdown
    }))
  );
  const [activeTaskList, setActiveTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleTaskActivation = (taskId) => {
    const taskToActivate = currentTaskList.find((task) => task.id === taskId);
    setCurrentTaskList((prev) => prev.filter((task) => task.id !== taskId));
    setActiveTaskList((prev) => [...prev, taskToActivate]);
  };

  const handleRestartTask = (taskId) => {
    const restartedTask = completedTaskList.find((task) => task.id === taskId);
    setCompletedTaskList((prev) => prev.filter((task) => task.id !== taskId));
    setCurrentTaskList((prev) => [
      ...prev,
      { ...restartedTask, countdown: restartedTask.originalCountdown },
    ]);
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setActiveTaskList((prev) =>
        prev.map((task) => {
          if (task.countdown > 0) {
            return { ...task, countdown: task.countdown - 1 };
          } else {
            const completedTask = { ...task };
            setCompletedTaskList((prevCompleted) => [
              ...prevCompleted.filter(
                (t) => t.id !== completedTask.id
              ), // Remove duplicates
              completedTask,
            ]);
            return null; // Remove the task from the active list
          }
        }).filter(Boolean)
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="countdown-page">
      <h1 className="welcome-text">Welcome, Guest!</h1>
      <div className="task-container">
        {/* Current Task List Section */}
        <div className="current-task-box">
          <h2>Current Task List</h2>
          <ul className="task-list">
            {currentTaskList.map((task) => (
              <li
                key={task.id}
                className="task-item"
                style={{
                  backgroundColor: `${task.color}66`, // 40% opacity
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-countdown">
                    {task.originalCountdown}s
                  </span>
                </div>
                <button
                  className="activate-button"
                  onClick={() => handleTaskActivation(task.id)}
                >
                  Activate
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Task List Section */}
        <div className="active-task-box">
          <h2>Active Tasks</h2>
          <ul className="task-list">
            {activeTaskList.map((task) => (
              <li
                key={task.id}
                className="task-item active"
                style={{
                  backgroundColor: `${task.color}66`, // 40% opacity
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-countdown">{task.countdown}s</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Task List Section */}
        <div className="completed-task-box">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {completedTaskList.map((task) => (
              <li
                key={task.id}
                className="task-item completed"
                style={{
                  backgroundColor: `${task.color}88`, // Higher opacity for completed
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-original-countdown">
                    {task.originalCountdown}s
                  </span>
                </div>
                <button
                  className="restart-button"
                  onClick={() => handleRestartTask(task.id)}
                >
                  Restart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Go Back Button */}
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default CountdownPage;
