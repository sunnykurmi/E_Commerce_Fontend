import axios from "../../utils/Axios";

import { setProds } from "../reducers/AllProdSlice"

export const getAllProds = () => async (dispatch) => {
    try {
        const {data} = await axios.get('/product')
        dispatch(setProds(data.products))
    } catch (error) {
        console.log(error)
    }
}




  