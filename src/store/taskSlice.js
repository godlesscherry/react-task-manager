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
        state.currentTaskList = state.currentTaskList.filter((task) => task.id !== action.payload);
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
        task.countdown = 0; // Set countdown to 0 on completion
        state.completedTaskList.push(task);
        state.currentTaskList.splice(taskIndex, 1); // Remove from current list
      }
    },
    restartTask: (state, action) => {
      const taskIndex = state.completedTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const task = state.completedTaskList[taskIndex];
        task.state = 'pending';
        task.countdown = task.originalCountdown; // Reset countdown to originalCountdown
        state.currentTaskList.push(task);
        state.completedTaskList.splice(taskIndex, 1); // Remove from completed list
      }
    },
    decrementActiveTaskCountdown: (state) => {
      state.currentTaskList = state.currentTaskList.map((task) => {
        if (task.state === 'active' && task.countdown > 0) {
          return { ...task, countdown: task.countdown - 1 };
        }
        if (task.state === 'active' && task.countdown === 0) {
          task.state = 'completed';
          state.completedTaskList.push(task);
          return null;
        }
        return task;
      }).filter(Boolean); // Remove null tasks
    },
  },
});

export const {
  addTask,
  deleteTask,
  activateTask,
  completeTask,
  restartTask,
  decrementActiveTaskCountdown,
} = taskSlice.actions;

export const selectCurrentTasks = (state) => state.tasks.currentTaskList;
export const selectCompletedTasks = (state) => state.tasks.completedTaskList;

export default taskSlice.reducer;
