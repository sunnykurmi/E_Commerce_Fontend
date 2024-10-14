import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/userAction";
import { Link } from "react-router-dom";
import Button from "../partials/Button";
import NoOrders from "../Order/NoOrders";

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  return Object.keys(user).length > 0 ? (
    <div className="w-full h-full pt-16 pb-4 lg:mt-0 lg:mb-0 mb-6">
      <div className="flex md:flex-row flex-col z-30 md:items-center md:justify-between backdrop-blur-lg px-6 md:px-20 py-4 top-16 gap-4 mb-6">
        <div className="">
      <div className="flex items-center gap-4">
        <div className="w-20 aspect-square bg-[#344e41] rounded-full">
          <img draggable="false"
            src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
        </div>
        {user && (
          <div>
            <h2 className="text-2xl font-bold">
              <span>Hello!</span> {user.name}
            </h2>
            <p className="text-gray-600">
              {user.isSeller ? "Seller" : "Customer"}
            </p>
          </div>
        )}
      </div>
        </div>

      {
        user.isSeller && 
        <Link to="/product/new/upload">
        <Button text="Add Product" type="fill" />
      </Link>
      }
    </div>
    </div>
  ) : (
    <NoOrders text="products" />
  );
};

export default SellerProfile;

