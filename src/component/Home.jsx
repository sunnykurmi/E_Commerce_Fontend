import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProdCard from './partials/ProdCard';
import { getuser } from '../store/actions/userAction';
import { getAllProds } from '../store/actions/AllProdAction';
import Loading from './partials/Loading';

const Home = () => {
  const dispatch = useDispatch();
  const {prods} = useSelector(state => state.allProdReducer);

  const { user } = useSelector((state) => state.userReducer);
  
  useEffect(()=>{
    dispatch(getAllProds())
    dispatch(getuser());
  },[dispatch])

  return Object.keys(user).length>0 ? (
    <div className="container w-full bg-gradient-to-br from-[#f1f8ee] to-[#fff] px-4 md:px-20 md:pb-20 md:pt-20">
        <img draggable="false" className='w-full h-96 object-cover border-[#344e41]' src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <h1 className="text-xl font-semibold my-8">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prods && prods.map(product => (
          

          <ProdCard
            key={product._id}
            id={product._id}
            image={product.images[0]}
            name={product.name}
            price={product.price}
            />
        ))}
      </div>
    </div>
  ):<Loading/> ;
};

export default Home;