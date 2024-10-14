import React, { useEffect } from 'react'
import MainRouter from './route/MainRouter'
import Nav from './component/partials/Nav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getuser } from './store/actions/userAction';
import Loading from './component/partials/Loading';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);


  // if()


  useEffect(() => {
    dispatch(getuser());
  }, []);


  return (
    <div className='w-full relative'>
      <Nav/>
      <MainRouter/>
      <ToastContainer
          position="top-right" 
          autoClose={2000} 
          hideProgressBar={false} 
          newestOnTop 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
    </div>
  )
}

export default App