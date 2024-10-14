import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {}  // Initial state for user
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Correctly mutate state.user
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
