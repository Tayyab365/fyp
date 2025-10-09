import React from 'react'
import { useOrders } from '../../hooks/useOrders'

const Orders = () => {

    const { orders, loading, error } = useOrders();

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-600'>Orders</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Order</button>
            </div>

            <div className='overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200'>
                <table className='w-full text-sm text-left'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-2 px-4'>Order ID</th>
                            <th className='py-2 px-4'>Customer</th>
                            <th className='py-2 px-4'>Products</th>
                            <th className='py-2 px-4'>Amount</th>
                            <th className='py-2 px-4'>Status</th>
                            <th className='py-2 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t hover:bg-gray-50">
                                <td className='py-2 px-4'>{order.id}</td>
                                <td className='py-2 px-4'>{order.customer}</td>
                                <td className='py-2 px-4'>{order.products}</td>
                                <td className='py-2 px-4'>{order.amount}</td>
                                <td className={`py-2 px-4 font-medium ${
                                    order.status === "Completed" ? "text-green-600" :
                                    order.status === "Pending" ? "text-yellow-600" :
                                    "text-red-600"
                                }`}>{order.status}</td>
                                <td className='py-2 px-4 flex gap-2'>
                                    <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition'>View</button>
                                    <button className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
