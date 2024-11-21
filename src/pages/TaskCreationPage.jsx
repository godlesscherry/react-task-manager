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
    const errors = [];
    if (!taskName.trim()) {
      errors.push('Task name is required.');
    }
    if (!taskCountdown.trim() || isNaN(taskCountdown) || taskCountdown <= 0) {
      errors.push('Countdown must be a positive number.');
    }
    if (!taskColor.trim()) {
      errors.push('Background color is required.');
    }

    if (errors.length > 0) {
      setError(errors.join(' '));
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

  const getColorName = (color) => {
    // Add simple color-to-name mapping
    const colorNames = {
      '#ffffff': 'White',
      '#000000': 'Black',
      '#ff0000': 'Red',
      '#00ff00': 'Green',
      '#0000ff': 'Blue',
    };
    return colorNames[color.toLowerCase()] || color;
  };

  const handleNext = () => {
    alert('Proceeding to the next page!');
    // Add logic to navigate to the next page or process tasks further
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
              required
            />
          </div>
          <div className="form-group color-group">
            <label className="form-label">Background Color:</label>
            <input
              type="color"
              className="color-input"
              value={taskColor}
              onChange={(e) => setTaskColor(e.target.value)}
              required
            />
            <span className="color-name">{getColorName(taskColor)}</span>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Countdown Timer (seconds)"
              className="form-input"
              value={taskCountdown}
              onChange={(e) => setTaskCountdown(e.target.value)}
              required
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
                style={{
                  backgroundColor: `${task.color}66`, // Background with 40% opacity
                  borderColor: task.color, // Dynamic border
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-countdown">{task.countdown}s</span>
                </div>
                <button
                  className="delete-button"
                  onClick={() =>
                    setTaskPreview((prev) => prev.filter((t) => t.id !== task.id))
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationPage;
