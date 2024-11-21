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
      state.currentTaskList.push({
        ...action.payload,
        originalCountdown: action.payload.countdown,
        countdown: action.payload.countdown,
        state: 'pending',
      });
    },
    activateTask: (state, action) => {
      const taskIndex = state.currentTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.currentTaskList.splice(taskIndex, 1);
        task.state = 'active';
        task.countdown = task.originalCountdown; // Copy originalCountdown to countdown
        state.activeTaskList.push(task);
      }
    },
    completeTask: (state, action) => {
      const taskIndex = state.activeTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.activeTaskList.splice(taskIndex, 1);
        task.state = 'completed';
        task.countdown = 0; // Set countdown to 0 on completion
        state.completedTaskList.push(task);
      }
    },
    restartTask: (state, action) => {
      const taskIndex = state.completedTaskList.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.completedTaskList.splice(taskIndex, 1);
        task.state = 'pending';
        task.countdown = task.originalCountdown; // Reset countdown to originalCountdown
        state.currentTaskList.push(task);
      }
    },
    decrementActiveTaskCountdown: (state) => {
      state.activeTaskList = state.activeTaskList.map((task) => {
        if (task.countdown > 0) {
          return { ...task, countdown: task.countdown - 1 }; // Decrease countdown
        }
        return { ...task, countdown: 0, state: 'completed' }; // Mark as completed when countdown reaches 0
      });

      // Move completed tasks to completedTaskList
      const completedTasks = state.activeTaskList.filter((task) => task.countdown === 0);
      state.completedTaskList.push(...completedTasks);

      // Keep only active tasks with countdown > 0
      state.activeTaskList = state.activeTaskList.filter((task) => task.countdown > 0);
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
