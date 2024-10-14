import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../component/Home";
import ProdDetails from "../component/ProdDetails";
import Create from "../component/seller/product/Create";
import Login from "../component/login/Login";
import Cart from "../component/Cart/Cart";
import OrderSummary from "../component/Order/OrderSummary";
import Register from "../component/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../store/actions/userAction";
import NotFound from "../component/partials/NotFound";
import Account from "../component/Account";

const MainRouter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getuser());
  }, []);


  return (
    <Routes>
      {Object.keys(user).length > 0 && (
        <>
          <Route path="/account" element={<Account />} />
          {user.isSeller ? (
            <>
              <Route path="/product/new/upload" element={<Create />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/product/:id" element={<ProdDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orderSummary" element={<OrderSummary />} />
            </>
          )}
        </>
      )}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRouter;
