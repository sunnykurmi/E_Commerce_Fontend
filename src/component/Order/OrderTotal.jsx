import React from 'react'

const OrderTotal = ({ total }) => (
    <div className="border-t border-[#344e41] pt-6">
      <div className="flex justify-between items-center text-2xl font-bold text-[#344e41]">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );

export default OrderTotal
