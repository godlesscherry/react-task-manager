import React, { useState } from 'react';
import './TaskCreationPage.css'; // Import the CSS file

const TaskCreationPage = () => {
  const [username] = useState(localStorage.getItem('username') || 'Guest');
  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('#ffffff'); // Default color
  const [taskCountdown, setTaskCountdown] = useState(''); // Countdown timer
  const [taskPreview, setTaskPreview] = useState([]);
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }
    if (!taskCountdown.trim() || isNaN(taskCountdown) || taskCountdown <= 0) {
      setError('Countdown must be a positive number');
      return;
    }

    setError('');

    // Add task to preview
    setTaskPreview((prev) => [
      ...prev,
      { id: prev.length + 1, name: taskName, color: taskColor, countdown: taskCountdown },
    ]);

    // Clear inputs
    clearInputs();
  };

  const clearInputs = () => {
    setTaskName('');
    setTaskColor('#ffffff'); // Reset to default
    setTaskCountdown('');
    setError('');
  };

  return (
    <div className="task-creation-page">
      <div className="username-box">
        <span>Welcome, {username}</span>
      </div>
      <div className="task-container">
        <div className="create-task-box">
          <h2>Create Task</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Task Name"
              className="form-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="form-group color-group">
            <label className="form-label">Background Color:</label>
            <input
              type="color"
              className="color-input"
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Countdown Timer (seconds)"
              className="form-input"
              value={taskCountdown}
              onChange={(e) => setTaskCountdown(e.target.value)}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="button-group">
            <button className="task-button" onClick={handleAddTask}>
              Add Task
            </button>
            <button className="clear-button" onClick={clearInputs}>
              Clear
            </button>
          </div>
        </div>
        <div className="task-preview-box">
          <h2>Preview Task List</h2>
          <ul className="task-list">
            {taskPreview.map((task) => (
              <li
                key={task.id}
                className="task-item"
                style={{ backgroundColor: task.color }}
              >
                {task.name} - {task.countdown}s
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationPage;
