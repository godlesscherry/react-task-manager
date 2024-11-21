import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTaskList = location.state?.taskList || []; // Retrieve the passed task list

  const [currentTaskList, setCurrentTaskList] = useState(initialTaskList);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleTaskCompletion = (taskId) => {
    const completedTask = currentTaskList.find((task) => task.id === taskId);
    setCurrentTaskList((prev) => prev.filter((task) => task.id !== taskId));
    setCompletedTaskList((prev) => [...prev, completedTask]);
  };

  const handleRestartTask = (taskId) => {
    const restartedTask = completedTaskList.find((task) => task.id === taskId);
    setCompletedTaskList((prev) => prev.filter((task) => task.id !== taskId));
    setCurrentTaskList((prev) => [...prev, restartedTask]);
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCurrentTaskList((prev) =>
        prev.map((task) => {
          if (task.countdown > 0) {
            return { ...task, countdown: task.countdown - 1 };
          } else {
            handleTaskCompletion(task.id);
            return task;
          }
        })
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [currentTaskList]);

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
                  <span className="task-countdown">{task.countdown}s</span>
                </div>
                <button
                  className="complete-button"
                  onClick={() => handleTaskCompletion(task.id)}
                >
                  Complete
                </button>
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
                  <span className="task-status">Completed</span>
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
