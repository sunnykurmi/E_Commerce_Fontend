import React from "react";
import { Link } from "react-router-dom";
import Button from "../partials/Button";

const CartSummary = ({ total }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="text-xl sm:text-2xl font-bold text-[#344e41] text-center sm:text-left w-full sm:w-auto">
        Total:₹<span>{total.toFixed(2)}</span>
      </div>
      <Link to="/orderSummary" className="w-full sm:w-auto">
        <Button text="Proceed to Checkout" />
      </Link>
    </div>
  );
};

export default CartSummary;
