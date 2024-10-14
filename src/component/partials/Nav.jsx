import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logoutuser } from '../../store/actions/userAction';

const Nav = () => {

  const { user } = useSelector((state) => state.userReducer);
  // console.log(user)

  const {pathname}= useLocation();

  // console.log(pathname)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler =async ()=>{
    await dispatch(logoutuser());
    navigate('/');
  }
  

  return  pathname == '/' || pathname == '/register' || Object.keys(user).length > 0 &&  (
    <nav className="fixed md:px-20  top-0 left-0 w-full h-16 flex items-center bg-[#f4f9f1]/[.4] text-[#3a5a40] z-30 backdrop-blur-lg p-4">
      <div className="container flex justify-between items-center">
          {user.isSeller ? <Link to="/account" className="text-2xl font-mono uppercase italic font-bold">Shoppy</Link> :<Link to="/home" className="text-2xl font-mono uppercase italic font-bold">Shoppy</Link> }
        <div className="flex gap-3 md:gap-10">   
                 
                 {!user.isSeller &&
          <Link to="/cart" className="hover:text-gray-300">Cart</Link>
                 }
          <Link to="/account" className="hover:text-gray-300">Account</Link>
          <Link onClick={logoutHandler} className="hover:text-gray-300">Logout</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav