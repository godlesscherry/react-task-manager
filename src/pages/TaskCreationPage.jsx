import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store/taskSlice'; // Import Redux action
import { selectUserIdentifier } from '../store/userSlice'; // Import user selector
import { useNavigate } from 'react-router-dom';
import './TaskCreationPage.css'; // Import the CSS file

const MAX_TASKS = 10; // Define the maximum number of tasks allowed

const TaskCreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const taskPreview = useSelector((state) => state.tasks.currentTaskList); // Get current tasks from Redux
  const userIdentifier = useSelector(selectUserIdentifier);

  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('#ffffff'); // Default color
  const [taskCountdown, setTaskCountdown] = useState(''); // Countdown timer
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (taskPreview.length >= MAX_TASKS) {
      setError('You have reached the maximum number of tasks (10).');
      return;
    }

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

    // Generate the next task ID
    const nextTaskId = taskPreview.length + 1;

    // Add task to Redux store
    dispatch(
      addTask({
        id: nextTaskId, // Incremental ID
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

  const handleDeleteTask = (taskId) => {
    // Filter the task to be deleted and reorder remaining tasks
    const reorderedTasks = taskPreview
      .filter((task) => task.id !== taskId) // Remove the task with the given ID
      .map((task, index) => ({
        ...task,
        id: index + 1, // Reassign IDs sequentially
      }));
  
    // Dispatch a reset of the entire task list with reordered tasks
    dispatch({ type: 'tasks/resetTasks', payload: reorderedTasks });
  
    // Clear the error if tasks drop below the limit
    if (reorderedTasks.length < MAX_TASKS) {
      setError('');
    }
  };  

  return (
    <div className="task-creation-page">
      <div className="username-box">
        <span>Welcome, {userIdentifier || 'Guest'}!</span>
      </div>
      <div className="task-container">
        <div className="create-task-box">
          <h2>Create Task</h2>
          <div className="info-icon">ℹ️ You can create a maximum of 10 tasks in a tasklist</div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Task Name"
              className="form-input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              disabled={taskPreview.length >= MAX_TASKS} // Disable input if the limit is reached
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
              disabled={taskPreview.length >= MAX_TASKS} // Disable input if the limit is reached
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Time to finish (seconds)"
              className="form-input"
              value={taskCountdown}
              onChange={(e) => setTaskCountdown(e.target.value)}
              required
              disabled={taskPreview.length >= MAX_TASKS} // Disable input if the limit is reached
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          {taskPreview.length < MAX_TASKS ? (
            <div className="button-group">
              <button className="task-button" onClick={handleAddTask}>
                Add Task
              </button>
              <button className="clear-button" onClick={handleClear}>
                Clear
              </button>
            </div>
          ) : (
            <p className="error-text">Maximum number of tasks reached. Please delete a task to add more.</p>
          )}
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
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
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-countdown">Countdown: {task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
                {task.state === 'pending' && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationPage;
