import React, { useEffect } from 'react';
import axios from './Axios';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../store/actions/CartAction';
import { useNavigate } from 'react-router-dom';

const RazorpayButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // Function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Create order ID by calling your backend API
    try {
      const response = await axios.post('/payment/create/orderId');
      const { amount, currency, id: order_id } = response.data;

      // Set Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: 'Devraj Rathor',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo', // Your company logo
        order_id: order_id,
        handler: async (response) => {
          try {
            // Verify payment by calling your backend API
            const verifyResponse = await axios.post('/payment/payment/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            if(verifyResponse.data.status == "success"){
                dispatch(emptyCart());
                navigate('/account');
            };

          } catch (error) {
            console.error('Payment verification failed', error);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', (response) => {
        console.error('Payment failed', response.error);
      });

      // Open Razorpay checkout
      rzp1.open();
    } catch (error) {
      console.error('Failed to create order ID', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} className="bg-[#344e41] text-white px-6 py-2 hover:opacity-80 duration-200 ">
        Confirm Order
      </button>
    </div>
  );
};

export default RazorpayButton;
