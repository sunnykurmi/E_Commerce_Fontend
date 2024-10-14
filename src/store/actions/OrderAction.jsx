import { setorder } from '../reducers/OrderSlice';
import axios from "../../utils/Axios";


// Action to get orders
export const getOrders = () => async (dispatch) => {
  try {
    // console.log("hello")
    const response = await axios.get('/order/userOrder');
    // console.log(response)
    dispatch(setorder(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

