import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prod:{},
}
const SingleProdSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
    setProd: (state, action) => {
      state.prod = action.payload;
    },
  },
});


// Action creators are generated for each case reducer function
export const { setProd } = SingleProdSlice.actions

export default SingleProdSlice.reducer