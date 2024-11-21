import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  activateTask,
  restartTask,
  decrementActiveTaskCountdown,
  selectCurrentTasks,
  selectActiveTasks,
  selectCompletedTasks,
} from '../store/taskSlice';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTaskList = useSelector(selectCurrentTasks);
  const activeTaskList = useSelector(selectActiveTasks);
  const completedTaskList = useSelector(selectCompletedTasks);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      dispatch(decrementActiveTaskCountdown());
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [dispatch]);

  const handleGoBack = () => {
    navigate('/task-creation');
  };

  return (
    <div className="countdown-page">
      <h1 className="welcome-text">Welcome, Guest!</h1>
      <div className="task-container">
        {/* Current Task List */}
        <div className="current-task-box">
          <h2>Current Task List</h2>
          <ul className="task-list">
            {currentTaskList.map((task) => (
              <li key={task.id} className="task-item" style={{ backgroundColor: `${task.color}66` }}>
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-original-countdown">
                    Original: {task.originalCountdown}s
                  </span>
                  <span className="task-countdown">Current: {task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
                <button className="activate-button" onClick={() => dispatch(activateTask(task.id))}>
                  Activate
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Task List */}
        <div className="active-task-box">
          <h2>Active Tasks</h2>
          <ul className="task-list">
            {activeTaskList.map((task) => (
              <li key={task.id} className="task-item active" style={{ backgroundColor: `${task.color}66` }}>
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-original-countdown">
                    Original: {task.originalCountdown}s
                  </span>
                  <span className="task-countdown">Current: {task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Task List */}
        <div className="completed-task-box">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {completedTaskList.map((task) => (
              <li key={task.id} className="task-item completed" style={{ backgroundColor: `${task.color}88` }}>
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-original-countdown">
                    Original: {task.originalCountdown}s
                  </span>
                  <span className="task-countdown">
                    Current: {task.countdown}s
                  </span>
                  <span className="task-state">State: {task.state}</span>
                </div>
                <button className="restart-button" onClick={() => dispatch(restartTask(task.id))}>
                  Restart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default CountdownPage;
