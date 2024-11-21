import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    currentTaskList: [],
    activeTaskList: [],
    completedTaskList: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.currentTaskList.push(action.payload);
    },
    activateTask: (state, action) => {
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.currentTaskList.splice(taskIndex, 1);
        task.state = 'active';
        state.activeTaskList.push(task);
      }
    },
    completeTask: (state, action) => {
      const taskIndex = state.activeTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.activeTaskList.splice(taskIndex, 1);
        task.state = 'completed';
        task.countdown = task.originalCountdown; // Retain the original countdown value
        state.completedTaskList.push(task);
      }
    },
    restartTask: (state, action) => {
        const taskIndex = state.completedTaskList.findIndex((task) => task.id === action.payload);
        if (taskIndex !== -1) {
          const [task] = state.completedTaskList.splice(taskIndex, 1);
          task.state = 'pending';
          task.countdown = task.originalCountdown; // Reset countdown
          state.currentTaskList.push(task);
        }
      },
      
    decrementActiveTaskCountdown: (state) => {
      const updatedActiveTasks = [];
      state.activeTaskList.forEach((task) => {
        if (task.countdown > 0) {
          updatedActiveTasks.push({ ...task, countdown: task.countdown - 1 });
        } else {
          const completedTask = { ...task, state: 'completed', countdown: task.originalCountdown };
          state.completedTaskList.push(completedTask);
        }
      });
      state.activeTaskList = updatedActiveTasks;
    },
  },
});

export const {
  addTask,
  activateTask,
  completeTask,
  restartTask,
  decrementActiveTaskCountdown,
} = taskSlice.actions;

export const selectCurrentTasks = (state) => state.tasks.currentTaskList;
export const selectActiveTasks = (state) => state.tasks.activeTaskList;
export const selectCompletedTasks = (state) => state.tasks.completedTaskList;

export default taskSlice.reducer;
