import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../../store/actions/OrderAction'
import OrderItem from './OrderItem.jsx'
import NoOrders from './NoOrders'

const YourOrders = () => {
  const dispatch = useDispatch()
  const { order } = useSelector(state => state.orderReducer)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  if (!order) {
    return <div className="text-center  py-4">Loading orders...</div>
  }

  const sortedOrders = Array.isArray(order) ? [...order].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []
  const displayedOrders = showAll ? sortedOrders : sortedOrders.slice(0, 2)

  return (
    <div className="container px-10 md:px-20 py-8 w-full">
      {Array.isArray(order) && order.length > 0 ? (
        <>
          <h1 className='md:text-lg md:mb-4 text-[#344e41] font-semibold px-2 mb-2 flex justify-between items-center'>Your Orders <span>{displayedOrders.length}</span></h1>
          <div className="flex flex-col gap-4">
            {displayedOrders.map(order => (
              <OrderItem key={order._id} order={order} />
            ))}
            {sortedOrders.length > 2 && !showAll && (
              <div className="text-center">
                <button 
                  onClick={() => setShowAll(true)}
                  className="bg-[#344e41] text-white px-4 py-2 hover:bg-[#3a5a46] transition-colors"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <NoOrders />
      )}
    </div>
  )
}

export default YourOrders
