
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getuser } from '../../store/actions/userAction';
import { toast } from 'react-toastify';

const NotFound = () => {
  const {user} = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const data = await dispatch(getuser(navigate));
    if (data.response && Object.keys(user).length == 0 ) {
      toast.error(data.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      navigate('/') 
    }
  }

  useEffect(() => {
    fetchUser();
  }, []) // Remove dependency on user to prevent unnecessary re-fetches

  // Render nothing if user object is empty
  // if (Object.keys(user).length === 0) {
  //   return navigate('/');
  // }

  return (
    <div className='relative h-screen w-full  bg-gradient-to-br from-[#f1f8ee] to-[#fff] overflow-hidden'>
      

<div className="randomBg blur-sm absolute opacity-30 top-0 left-0 w-full md:h-[100vh] h-[60vh] aspect-square object-cover">
                    <i className="absolute ri-shopping-bag-fill text-5xl" style={{ top: `40%`, left: `90%` }}></i>
                    <i className="absolute ri-shopping-cart-2-fill text-3xl" style={{ top: `20%`, left: `70%` }}></i>
                    <i className="absolute ri-money-rupee-circle-fill text-6xl" style={{ top: `60%`, left: `20%` }}></i>
                    <i className="absolute ri-heart-3-fill text-5xl" style={{ top: `30%`, left: `10%` }}></i>
                </div>


      <div className='-200 flex relative items-center justify-center h-full flex-col'>
        <img draggable="false"  className='w-[20%] -mt-24' src="https://img1.picmix.com/output/stamp/normal/0/3/8/7/2377830_dc122.gif" alt="" />
        <h1 className='text-[3.4vw] font-bold tracking-tight -mt-10'>Page Not Found - 404</h1>
      </div>
    </div>
  )
}

export default NotFound
