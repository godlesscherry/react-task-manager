import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice'; // Import Redux action
import { useNavigate } from 'react-router-dom';
import './TaskCreationPage.css'; // Import the CSS file

const TaskCreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const taskPreview = useSelector((state) => state.tasks.currentTaskList); // Get current tasks from Redux

  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('#ffffff'); // Default color
  const [taskCountdown, setTaskCountdown] = useState(''); // Countdown timer
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

    // Add task to Redux store
    dispatch(
      addTask({
        id: Date.now(), // Unique ID for the task
        name: taskName,
        color: taskColor,
        countdown: parseInt(taskCountdown, 10),
        state: 'pending',
      })
    );

    // Clear inputs
    handleClear();
  };

  const handleClear = () => {
    setTaskName('');
    setTaskColor('#ffffff');
    setTaskCountdown('');
    setError('');
  };

  const handleNext = () => {
    navigate('/countdown'); // Navigate to CountdownPage
  };

  return (
    <div className="task-creation-page">
      <div className="username-box">
        <span>Welcome to Task Manager</span>
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
            <button className="clear-button" onClick={handleClear}>
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
                }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">{task.name}</span>
                  <span className="task-countdown">{task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
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
