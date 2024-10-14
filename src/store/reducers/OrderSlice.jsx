import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order:{},
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setorder: (state, action) => {
      state.order = action.payload
    },
  },
})

export const { setorder } = orderSlice.actions

export default orderSlice.reducer