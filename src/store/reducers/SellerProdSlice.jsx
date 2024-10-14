import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prods:[],
}

const sellerProdSlice = createSlice({
  name: 'prods',
  initialState,
  reducers: {
    setProds: (state, action) => {
      state.prods = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProds } = sellerProdSlice.actions

export default sellerProdSlice.reducer