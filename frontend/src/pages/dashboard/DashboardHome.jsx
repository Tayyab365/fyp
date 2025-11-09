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

  const revenue = orders.reduce((num, order) => {
    const total = order.orderSummary?.total || 0;
    return num + total;
  }, 0);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: (
        <Package
          size={24}
          className="text-blue-600 dark:text-[var(--accent-blue)]"
        />
      ),
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: (
        <ShoppingCart
          size={24}
          className="text-green-600 dark:text-green-400"
        />
      ),
    },
    {
      title: "Total Users",
      value: users.length,
      icon: (
        <Users size={24} className="text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: (
        <DollarSign
          size={24}
          className="text-yellow-500 dark:text-yellow-400"
        />
      ),
    },
  ];

  if (loading)
    return (
      <p className="text-gray-600 dark:text-[var(--text-secondary)] text-center mt-6">
        Loading dashboard...
      </p>
    );

  return (
    <div className="space-y-8 px-3 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-[var(--text-primary)] text-center sm:text-left">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between 
                       bg-white dark:bg-[var(--bg-card)] 
                       p-5 rounded-xl shadow-sm 
                       border border-gray-100 dark:border-[var(--border-color)] 
                       hover:shadow-md transition 
                       text-center sm:text-left"
          >
            <div>
              <h3 className="text-gray-500 dark:text-[var(--text-muted)] text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-[var(--text-primary)] mt-1">
                {stat.value}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[var(--bg-elevated)] rounded-lg mt-3 sm:mt-0">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
