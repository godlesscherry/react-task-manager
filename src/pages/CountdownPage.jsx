import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  activateTask,
  restartTask,
  decrementActiveTaskCountdown,
  selectCurrentTasks,
  selectCompletedTasks,
  updateTask,
} from '../store/taskSlice';
import { selectUserIdentifier } from '../store/userSlice';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userIdentifier = useSelector(selectUserIdentifier);
  const currentTaskList = useSelector(selectCurrentTasks);
  const completedTaskList = useSelector(selectCompletedTasks);

  const countdownTaskList = [
    ...currentTaskList.filter((task) => ['active', 'running'].includes(task.state)),
    ...completedTaskList,
  ];

  const allTasksActive = currentTaskList.every((task) => task.state === 'active');
  const allTasksComplete = countdownTaskList.every((task) => task.state === 'complete');

  // Handle task countdown
  useEffect(() => {
    if (countdownTaskList.some((task) => task.state === 'running')) {
      const countdownInterval = setInterval(() => {
        dispatch(decrementActiveTaskCountdown());
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [dispatch, countdownTaskList]);

  const handleActivateTask = (taskId) => {
    dispatch(activateTask(taskId));
  };

  const handleRunAll = () => {
    currentTaskList.forEach((task) => {
      if (task.state === 'active') {
        dispatch(updateTask({ id: task.id, changes: { state: 'running' } }));
      }
    });
  };

  const handleGoBack = () => {
    navigate('/task-creation');
  };

  return (
    <div className="countdown-page">
      <h1 className="welcome-text">Welcome, {userIdentifier || 'Guest'}!</h1>
      <div className="task-container">
        {/* Current Task List */}
        <div className="current-task-box">
          <h2>Current Task List</h2>
          <div className="info-icon">ℹ️ `Activate` all the tasks in the tasklist to `Run Tasks`</div>
          <ul className="task-list">
            {currentTaskList.map((task) => (
              <li key={task.id} className="task-item" style={{ backgroundColor: `${task.color}66` }}>
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-original-countdown">Countdown: {task.originalCountdown}s</span>
                  <span className="task-countdown">Current: {task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
                {task.state === 'pending' && (
                  <button
                    className="activate-button"
                    onClick={() => handleActivateTask(task.id)}
                  >
                    Activate
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Countdown Task List */}
        <div className="countdown-task-box">
          <h2>Countdown Stage</h2>
          <div className="info-icon">ℹ️ `Run All`to start the countdown timer</div>       
          <ul className="task-list">
            {countdownTaskList.map((task) => (
              <li
                key={task.id}
                className={`task-item ${
                  task.state === 'running' ? 'running' : task.state === 'complete' ? 'completed' : ''
                }`}
                style={{ backgroundColor: `${task.color}66` }}
              >
                <div className="task-details">
                  <span className="task-id">ID: {task.id}</span>
                  <span className="task-name">Task Name: {task.name}</span>
                  <span className="task-original-countdown">Countdown: {task.originalCountdown}s</span>
                  <span className="task-countdown">Current: {task.countdown}s</span>
                  <span className="task-state">State: {task.state}</span>
                </div>
                {task.state === 'completed' && (
                  <button
                    className="restart-button"
                    onClick={() => dispatch(restartTask(task.id))}
                  >
                    Restart
                  </button>
                )}
              </li>
            ))}
          </ul>
          
          {allTasksActive && !allTasksComplete && (
            <button className="run-all-button" onClick={handleRunAll}>
              Run All
            </button>
          )}
         
        </div>
        
      </div>
      <button className="go-back-button" onClick={handleGoBack}>
        ⟸ Go back to Preview Task List
      </button>
    </div>
  );
};

export default CountdownPage;
