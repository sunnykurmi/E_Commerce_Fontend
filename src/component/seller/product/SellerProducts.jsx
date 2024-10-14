import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerProds, deleteProd } from '../../../store/actions/SellerProdAction';
import NoOrders from '../../Order/NoOrders';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const IconWithHover = ({ baseClass, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const iconClass = isHovered ? baseClass.replace('-line', '-fill') : baseClass;

    return (
      <i 
        className={`${iconClass} transition-colors duration-300 cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      ></i>
    );
  };



  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProd(product._id, navigate));
    }
  };

  return (
    <div className="border border-[#344e41] group p-4 ">
      <div className="img-wrap w-full h-40 overflow-hidden">
        <img draggable="false" src={product.images[0]} alt={product.title} className="w-full h-full group-hover:scale-110 duration-300 object-cover mb-4" />
      </div>
      <h2 className="text-lg font-semibold">{product.title && product.title.slice(0,10)}</h2>
      <div className="flex w-full justify-between items-center">
        <IconWithHover baseClass="ri-delete-bin-6-line hover:text-red-500" onClick={handleDelete} />
      </div>
    </div>
  );
};

const SellerProducts = () => {
  const dispatch = useDispatch()
  const {prods} = useSelector((state) => state.sellerProdReducer)

  useEffect(()=>{
    dispatch(getSellerProds())
  },[dispatch])

  return (
    <div className='md:px-20 px-8' >
        {prods.length > 0 ?
        <>
      <h1 className='md:text-lg md:mb-4 text-[#344e41] font-semibold px-2 mb-2 flex justify-between items-center'>Your uploads <span>{prods && prods.length}</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 px-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {prods.map(product => (
          <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard product={product} />
            </Link>
        ))}
        </div>
        </>
        :
        <NoOrders text="uploads" />
        }
      </div>
    // </div>
  )
}

export default SellerProducts