import React, { useEffect } from 'react'
import YourOrders from './Order/YourOrders'
import { getuser } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import SellerProducts from './seller/product/SellerProducts';
import SellerProfile from './seller/Profile';

const Account = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.userReducer);


  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);


  return (
    <div className='w-full'>
      <SellerProfile/>
      {(Object.keys(user).length > 0) && (
        <>
        {user.isSeller ? <SellerProducts/> : <YourOrders/>}
        </>
      )}

    </div>
  )
}

export default Account
