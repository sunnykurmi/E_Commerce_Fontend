import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { getCart, removeFromCart, updateCart } from "../../store/actions/CartAction";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const [cartItems,setCartItems]=useState([]);
  const {products,totalAmount}= useSelector((state) => state.cartReducer.cart); 
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCart());
  },[])

  

  const updateQuantity = (id, newQuantity) => {
    dispatch(updateCart(id,newQuantity));
  };

  const removeItem = (id) => {
    // console.log(id);
    dispatch(removeFromCart(id));
    setCartItems( products && products.filter((item) => item.id !== id));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1f8ee] to-[#fff] py-8 px-4 sm:py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-8 text-center text-[#344e41]">{!products || products.length  === 0 ? "Your Cart is Empty" : "Your Cart"}</h1>
        <div className="border shadow-2xl p-4 sm:p-6 space-y-6 sm:space-y-8">
          {!products || products.length === 0 ? (
              <h1 className="text-[#344e41] text-lg sm:text-xl font-semibold text-center">
             <img draggable="false" className="mix-blend-multiply mx-auto" src="https://www.getillustrations.com/packs/matilda-startup-illustrations/scenes/_1x/shopping,%20e-commerce%20_%20empty,%20shopping%20cart,%20items,%20products,%20zero,%20none_md.png" alt="" />
            </h1>
          ) : (
              // <EmptyCart />
              <>
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <p className="text-lg font-semibold text-[#588157]">
                  {products.length} {products.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6 max-h-80 overflow-y-auto pr-2 sm:pr-4">
                {products.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
              <div className=" pt-4 sm:pt-6">
                <CartSummary total={totalAmount} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
