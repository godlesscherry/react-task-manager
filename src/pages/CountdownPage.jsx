import React, { useState, useEffect } from 'react';
import './CountdownPage.css'; // Import the CSS file

const CountdownPage = ({ previewTaskList }) => {
  const [currentTaskList, setCurrentTaskList] = useState([...previewTaskList]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleTaskCompletion = (taskId) => {
    const completedTask = currentTaskList.find((task) => task.id === taskId);
    setCurrentTaskList((prev) => prev.filter((task) => task.id !== taskId));
    setCompletedTaskList((prev) => [...prev, completedTask]);
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

  return (
    <div className="countdown-page">
      <div className="username-box">
        <span>Welcome, User</span>
      </div>
      <div className="task-container">
        {/* Current Task List */}
        <div className="current-task-box">
          <h2>Current Task List</h2>
          <ul className="task-list">
            {currentTaskList.map((task) => (
              <li
                key={task.id}
                className="task-item"
                style={{
                  backgroundColor: `${task.color}66`,
                  borderColor: task.color,
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
        {/* Completed Task List */}
        <div className="completed-task-box">
          <h2>Completed Task List</h2>
          <ul className="task-list">
            {completedTaskList.map((task) => (
              <li
                key={task.id}
                className="task-item completed"
                style={{
                  backgroundColor: `${task.color}88`, // Higher opacity for completed
                  borderColor: task.color,
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-status">Completed</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
