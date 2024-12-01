import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userIdentifier: null, // To store username or email
    isLoggedIn: false, // to manage login state for navigation
  },
  reducers: {
    setUserIdentifier: (state, action) => {
      state.userIdentifier = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.userIdentifier = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserIdentifier, logoutUser } = userSlice.actions;

export const selectUserIdentifier = (state) => state.user.userIdentifier;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export default userSlice.reducer;
