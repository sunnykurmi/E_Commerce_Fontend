import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center justify-between border-b border-[#344e41] pb-4 sm:pb-6 mb-4 sm:mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex items-center ">
        <img draggable="false"
          src={item.productId.images[0]}
          // alt={item.name}
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mr-3 sm:mr-4"
          loading="lazy"
        />
        <div>
          <h2 className="font-semibold text-base sm:text-lg text-[#344e41]">{item.productId.title}</h2>
          <p className="text-sm sm:text-base ">{item.productId.description}</p>
          <p className="text-sm sm:text-base font-semibold ">₹{item.productId.price}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <button
          className="px-2 sm:px-3 py-1 bg-[#588157] text-white rounded-l-lg hover:bg-[#3a5a40] transition duration-300"
          onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
          disabled={item.quantity === 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="mx-1 sm:mx-2 px-2 sm:px-4 py-1 bg-white border border-[#588157] text-[#344e41]">
          {item.quantity}
        </span>
        <button
          className="px-2 sm:px-3 py-1 bg-[#588157] text-white rounded-r-lg hover:bg-[#3a5a40] transition duration-300"
          onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
          disabled={item.quantity === 10}
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          className="ml-3 sm:ml-4 text-[#344e41] hover:text-[#da2c38] transition duration-300"
          onClick={() => removeItem(item.productId._id)}
          aria-label="Remove item"
        >
          <i className="ri-delete-bin-line text-lg sm:text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
