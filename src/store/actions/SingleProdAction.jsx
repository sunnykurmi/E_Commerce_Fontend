import axios from "../../utils/axios"
import { setProd } from "../reducers/SingleProdSlice"

export const getSingleProd = ({id}) => async (dispatch) => {
    try {
        const {data} = await axios.post(`/product/${id}`)
        dispatch(setProd(data.product))
    } catch (error) {
        console.log(error)
    }
}




  