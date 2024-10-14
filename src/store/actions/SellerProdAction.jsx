import { toast } from "react-toastify";
import axios from "../../utils/axios"
import { setProds } from "../reducers/SellerProdSlice"

export const getSellerProds = () => async (dispatch) => {
    try {
        const {data} = await axios.get('/product/seller-products');
        // console.log(data);
        dispatch(setProds(data.products))
    } catch (error) {
        console.log(error)
    }
}

export const uploadNewProd = (data,navigate) => async (dispatch) => {
    try {
        const newProd  = await axios.post('/product/create',data)
        navigate('/account')
    } catch (error) {
        console.log(error)
    }
}

export const deleteProd = (id,navigate) => async (dispatch,getState) => {
    try {
        const {data}  = await axios.post(`/product/delete/${id}`)
        const newProds = getState().sellerProdReducer.prods.filter(prod => prod._id !== id)
        dispatch(setProds(newProds))
        toast.success("Product deleted successfully")
        navigate('/account')
    } catch (error) {
        console.log(error)
    }
}

  