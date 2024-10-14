import React from 'react'

const OrderItems = ({ orderItems }) => {
  if (!orderItems || orderItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#344e41]">Items</h2>
      <div className="max-h-64 overflow-y-auto pr-6">
        {orderItems.map(({productId,quantity}) => (
          <div key={productId._id} className="flex justify-between items-center border-b border-[#344e41] mb-3 pb-3 last:mb-0">
            <div className="flex items-center space-x-4">
              <img draggable="false" src={productId.images[0]} alt={productId.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg ">{productId.title}</h3>
                <p className="">
                  Quantity: <span className="font-medium">{quantity}</span>
                </p>
              </div>
            </div>
            <span className="font-semibold text-xl text-[#344e41]">₹{(productId.price*quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItems
