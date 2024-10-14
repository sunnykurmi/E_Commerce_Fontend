// src/component/Order/NoOrders.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const NoOrders = ({text}) => {
  return (
    <div className="text-center py-8 bg-gray-50/[0] flex flex-col items-center gap-3 rounded-lg">
      <img className='h-40 w-max opacity-30' src="https://cdn-icons-png.flaticon.com/512/594/594550.png" alt="" />
      <p className="md:text-2xl opacity-30 text-[#344e41] font-semibold px-2 flex justify-between items-end">No {text} yet.</p>
      {
        text === "orders" ?
        <Link to="/home">
      <h1 className='text-[#344e41] font-semibold border-b-2 border-[#344e41] border-transparent cursor-pointer transition-all duration-300  hover:border-[#344e41]'>Start Shopping</h1>
      </Link>
      :
      <Link to="/product/new/upload">
      <h1 className='text-[#344e41] font-semibold border-b-2 border-[#344e41] border-transparent cursor-pointer transition-all duration-300  hover:border-[#344e41]'>Add Product</h1>
      </Link>
      }
    </div>
  )
}

export default NoOrders
