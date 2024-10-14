import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prods:[],
}

const AllProdSlice = createSlice({
  name: 'prods',
  initialState,
  reducers: {
    setProds: (state, action) => {
      state.prods = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProds } = AllProdSlice.actions

export default AllProdSlice.reducer