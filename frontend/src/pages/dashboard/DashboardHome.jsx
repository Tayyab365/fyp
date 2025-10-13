import React from "react";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useOrders } from "../../hooks/useOrders";
import { useUsers } from "../../hooks/useUsers";

const DashboardHome = () => {
  const { products, loading: loadingProducts } = useProducts();
  const { orders, loading: loadingOrders } = useOrders();
  const { users, loading: loadingUsers } = useUsers();

  const loading = loadingProducts || loadingOrders || loadingUsers;

  const revenue = orders.reduce((sum, order) => {
    const amt = order.amount ?? "0";
    const num = parseFloat(String(amt).replace(/[^0-9.-]+/g, "") || 0);
    return num + sum;
  }, 0);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package size={24} className="text-blue-600" />,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart size={24} className="text-green-600" />,
    },
    {
      title: "Total Users",
      value: users.length,
      icon: <Users size={24} className="text-purple-600" />,
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: <DollarSign size={24} className="text-yellow-500" />,
    },
  ];

  const recentOrders = [...orders].slice(-5).reverse();

  if (loading) return <p className="text-gray-600">Loading dashboard...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {stat.value}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Orders
        </h2>
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
                <td
                  className={`py-2 ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
