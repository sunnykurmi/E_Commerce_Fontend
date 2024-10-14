import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './partials/Button';
import { getSingleProd } from '../store/actions/SingleProdAction';
import { addToCart } from '../store/actions/CartAction';

const ProdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const {prod} = useSelector(state => state.singleProdReducer);

  useEffect(() => {
    dispatch(getSingleProd({id}));
    setMainImage(Object.keys(prod).length !== 0 && prod.images[0]);
    
  }, [dispatch, id,prod]);  
  


  const [mainImage, setMainImage] = useState(Object.keys(prod).length !== 0 && prod.images[0]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
      dispatch(addToCart(id));
      navigate('/cart');
  };

  return (
    Object.keys(prod).length !== 0 &&
    <div className="container w-full h-screen bg-red-300/[0] px-4 md:px-20 md:pb-20 md:pt-20">
      <div className="flex flex-col h-full md:flex-row gap-8">
        <div className="md:w-1/2 h-full bg-zinc-100">
          <img draggable="false" className='w-full h-full object-cover' src={mainImage} alt={prod.title} />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">{prod.title}</h1>
          <p className="text-gray-600 text-xl mb-4">₹{prod.price.toFixed(2)}</p>
          <div className="flex gap-2 mt-4">
            {prod.images.map((img, index) => (
              <img draggable="false" 
                key={index}
                src={img} 
                alt={`${prod.title} - Image ${index + 1}`}
                className="w-20 h-20 object-cover bg-zinc-100 cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => setMainImage(img)}
              />
            ))}
          </div>
          <p className="text-gray-700 mb-6">{prod.description}</p>
          <div className="flex gap-4">
            <button 
              className={`bg-[#344e41] text-white px-6 py-2 hover:opacity-80 duration-200 ${isAddedToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Going to Cart...' : 'Add to Cart'}
            </button>
            <Button text='Buy Now'  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetails;