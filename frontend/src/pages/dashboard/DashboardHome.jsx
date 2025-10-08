import React from "react";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Products",
      value: 128,
      icon: <Package size={24} className="text-blue-600" />,
    },
    {
      title: "Total Orders",
      value: 56,
      icon: <ShoppingCart size={24} className="text-green-600" />,
    },
    {
      title: "Total Users",
      value: 243,
      icon: <Users size={24} className="text-purple-600" />,
    },
    {
      title: "Revenue",
      value: "$5,230",
      icon: <DollarSign size={24} className="text-yellow-500" />,
    },
  ];

  const recentOrders = [
        { id: "#1021", customer: "Ali Khan", amount: "$120", status: "Completed" },
        { id: "#1020", customer: "Ayesha Noor", amount: "$80", status: "Pending" },
        { id: "#1019", customer: "Usman Malik", amount: "$150", status: "Completed" },
    ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <table className="w-full text-sm text-left border-t border-gray-200">
          <thead>
            <tr className="text-gray-600">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
                <tr key={order.id} className="border-t">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.customer}</td>
                    <td className="py-2">{order.amount}</td>
                    <td className={`py-2 ${order.status === "Completed"
                        ? 'text-green-600'
                        : order.status === "Pending"
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }`}>{order.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
