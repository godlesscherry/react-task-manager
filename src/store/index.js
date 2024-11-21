import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import userReducer from './userSlice'; // Import userSlice

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer, // Add user reducer
  },
});

export default store;
