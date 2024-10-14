import React, { useState, useEffect } from "react";
import Button from "../partials/Button";
import OrderItems from "./OrderItems";
import OrderTotal from "./OrderTotal";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, getCart } from "../../store/actions/CartAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RazorpayButton from "../../utils/RazopayButton";

const OrderSummary = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState(cart.products);
  const [status, setStatus] = useState("");

  const total = orderItems
    ? orderItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      )
    : 0;

  useEffect(() => {
    // console.log(cart);
    if(total===0) navigate('/cart')
    if (cart && Object.keys(cart).length === 0) {
      dispatch(getCart());
    }
    if (!orderItems) setOrderItems(cart.products);
    if (status === "authorized") {
      toast.success("Order Confirmed");
      dispatch(emptyCart());
      navigate("/cart");
    } else if(status != '') {
      toast.error("Order Failed");
    }
  }, [status, cart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1f8ee] to-[#fff] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#344e41]">
          Order Summary
        </h1>
        <div className="border border-[#344e41] bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 space-y-8">
          <OrderItems orderItems={orderItems} />
          <OrderTotal total={total} />
        </div>
        <div className="flex w-full justify-center mt-5">
        <RazorpayButton/>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
