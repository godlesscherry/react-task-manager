import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userIdentifier: null, // To store username or email
  },
  reducers: {
    setUserIdentifier: (state, action) => {
      state.userIdentifier = action.payload;
    },
  },
});

export const { setUserIdentifier } = userSlice.actions;

export const selectUserIdentifier = (state) => state.user.userIdentifier;

export default userSlice.reducer;
