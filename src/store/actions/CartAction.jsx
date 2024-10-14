import { toast } from 'react-toastify';
import { setCart } from '../reducers/CartSlice';
import axios from '../../utils/axios';

// Action to get the cart
export const getCart = () => async (dispatch) => {
    try {
        // Assuming you're fetching the cart from an API
        const response = await axios.get('/cart/user');
        const data = response.data;
        dispatch(setCart(data));
    } catch (error) {
        console.log("Cart is empty");
    }
};

// Action to add an item to the cart
export const addToCart = (item,navigate) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/cart/add',{productId: item});
        const updatedCart = response.data;
        toast.success("Added to Cart successfully");
        dispatch(setCart(updatedCart));
        navigate('/cart');
    } catch (error) {
        toast.warn("Item already in cart");
        navigate('/cart');
    }
};

// Action to remove an item from the cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/cart/remove', {productId});
        if (response.status === 200) {
            const updatedCart = response.data.cart || [];
            dispatch(setCart(updatedCart));
        } else {
            toast.error('Failed to remove item from cart');
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        toast.error('An error occurred while removing the item from cart');
    }
};

export const updateCart = (id,newQuantity) => async (dispatch) => {
    try {
        console.log(id,newQuantity);
        // Log the request payload for debugging
        console.log('Request payload:', { productId: id, quantity: newQuantity });

        const response = await axios.post('/cart/update-quantity', { productId: id, quantity: newQuantity });

        // If the response is empty or undefined, use a fallback
        if (!response.data) {
            console.warn('Empty response received. Using fallback data.');
            response.data = {
                products: [{ productId: id, quantity: newQuantity }],
                totalAmount: 0 // You may want to calculate this based on the updated quantity
            };
        }
        const updatedCart = response.data.cart;
        dispatch(setCart(updatedCart));
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}
// Action to empty the cart
export const emptyCart = () => async (dispatch) => {
    try {
        const response = await axios.post('/order/complete-purchase');
        if (response.status === 200) {
            dispatch(setCart({ products: [], totalAmount: 0 }));
            toast.success("Cart emptied successfully");
        } else {
            toast.error('Failed to empty cart');
        }
    } catch (error) {
        console.error('Error emptying cart:', error);
        toast.error('An error occurred while emptying the cart');
    }
};
