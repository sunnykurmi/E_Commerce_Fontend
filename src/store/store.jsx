import { configureStore } from '@reduxjs/toolkit'
import sellerProdSlice from './reducers/SellerProdSlice'
import AllProdSlice from './reducers/AllProdSlice'
import userSlice from './reducers/userSlice'
import SingleProdSlice from './reducers/SingleProdSlice'
import CartSlice from './reducers/CartSlice'
import OrderSlice from './reducers/OrderSlice'

export const store = configureStore({
  reducer: {
    sellerProdReducer: sellerProdSlice,
    allProdReducer:AllProdSlice,
    userReducer:userSlice,
    singleProdReducer:SingleProdSlice,
    cartReducer:CartSlice,
    orderReducer:OrderSlice

}
})