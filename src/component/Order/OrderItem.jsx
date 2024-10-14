// src/component/Order/OrderItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const OrderHeader = ({ orderId, createdAt }) => (
  <div className="bg-[#344e41]/[.2] px-6 py-4 flex justify-between items-center">
    <span className="font-semibold">Order ID: {orderId}</span>
    <span className="text-sm">Date: {new Date(createdAt).toLocaleDateString()}</span>
  </div>
)

const OrderTable = ({ products }) => (
  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="text-left pb-2">Product</th>
        <th className="text-left pb-2">Title</th>
        <th className="text-center pb-2">Quantity</th>
        <th className="text-right pb-2">Price</th>
      </tr>
    </thead>
    <tbody>
      {products.map(item => (
        <tr key={item._id} className="border-b">
          <td className="py-2">
            <Link to={`/product/${item.productId._id}`}>
              <img src={item.productId.images[0]} alt={item.productId.title} className="w-16 h-16 object-cover" />
            </Link>
          </td>
          <td className="py-2">{item.productId.title}</td>
          <td className="text-center py-2">{item.quantity}</td>
          <td className="text-right py-2">₹{item.productId.price.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const OrderTotal = ({ totalAmount }) => (
  <div className="mt-4 text-right font-bold text-lg">
    Total: ₹{totalAmount.toFixed(2)}
  </div>
)

const OrderItem = ({ order }) => {
  return (
    <div className="bg-white border border-[#344e41] w-full overflow-hidden">
      <OrderHeader orderId={order._id} createdAt={order.createdAt} />
      <div className="p-6">
        <OrderTable products={order.products} />
        <OrderTotal totalAmount={order.totalAmount} />
      </div>
    </div>
  )
}

export default OrderItem