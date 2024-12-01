import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import taskReducer from './taskSlice';
import userReducer from './userSlice'; // Import userSlice

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

// Configure Persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for Redux Persist
    }),
});

export const persistor = persistStore(store);
export default store;
