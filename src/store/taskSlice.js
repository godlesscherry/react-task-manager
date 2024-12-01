import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    currentTaskList: [],
    completedTaskList: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.currentTaskList.push({
        ...action.payload,
        originalCountdown: action.payload.countdown,
        countdown: action.payload.countdown,
        state: 'pending',
      });
    },
    deleteTask: (state, action) => {
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        state.currentTaskList.splice(taskIndex, 1);
        state.currentTaskList = state.currentTaskList.map((task, index) => ({
          ...task,
          id: index + 1,
        }));
      }
    },
    activateTask: (state, action) => {
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        state.currentTaskList[taskIndex].state = 'active';
      }
    },
    completeTask: (state, action) => {
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const task = state.currentTaskList[taskIndex];
        task.state = 'completed';
        task.countdown = 0;
        state.completedTaskList.push(task);
        state.currentTaskList.splice(taskIndex, 1);
      }
    },
    restartTask: (state, action) => {
      const taskIndex = state.completedTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const task = state.completedTaskList[taskIndex];
        task.state = 'running';
        task.countdown = task.originalCountdown;
        state.completedTaskList.splice(taskIndex, 1);
        state.currentTaskList.push(task);
      }
    },
    updateTask: (state, action) => {
      const { id, changes } = action.payload;
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.currentTaskList[taskIndex] = {
          ...state.currentTaskList[taskIndex],
          ...changes,
        };
      }
    },
    decrementActiveTaskCountdown: (state) => {
      state.currentTaskList = state.currentTaskList.map((task) => {
        if (task.state === 'running' && task.countdown > 0) {
          return { ...task, countdown: task.countdown - 1 };
        }
        if (task.state === 'running' && task.countdown === 0) {
          task.state = 'completed';
          state.completedTaskList.push(task);
          return null;
        }
        return task;
      }).filter(Boolean);
    },
    clearTasks: (state) => {
      state.currentTaskList = [];
      state.completedTaskList = [];
    },
  },
});

export const {
  addTask,
  deleteTask,
  activateTask,
  completeTask,
  restartTask,
  updateTask,
  decrementActiveTaskCountdown,
  clearTasks,
} = taskSlice.actions;

export const selectCurrentTasks = (state) => state.tasks.currentTaskList;
export const selectCompletedTasks = (state) => state.tasks.completedTaskList;

export default taskSlice.reducer;
