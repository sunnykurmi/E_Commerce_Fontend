import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/CartAction";

const ProdCard = ({ id, image, name, price }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AddToCart = (e, id) => {
    e.stopPropagation();
    dispatch(addToCart(id, navigate));
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    // Add wishlist functionality here
  };

  return (
    <div className="border z-0 border-[#344e41] group p-4" onClick={handleCardClick}>
      <div className="img-wrap w-full h-64 overflow-hidden">
        <img draggable="false"
          src={image}
          alt={name}
          className="w-full h-full group-hover:scale-110 duration-300 object-cover mb-4"
        />
      </div>
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">₹{price.toFixed(2)}</p>
      <div className="flex w-full mt-4 justify-between items-center md:gap-6 gap-2">
        <div onClick={(e) => AddToCart(e, id)} className="z-[99]">
          <Button text={"Add to Cart"} />
        </div>
        <i
          className={`wishlist-icon z-[99] ${
            isHovered ? "ri-heart-3-fill" : "ri-heart-3-line"
          } text-[#344e41] text-2xl transition-all duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleWishlistClick}
        ></i>
      </div>
      </div>

  );
};

export default ProdCard;
