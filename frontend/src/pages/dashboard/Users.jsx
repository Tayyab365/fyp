import React from "react";
import { useUsers } from "../../hooks/useUsers";

const Users = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <p className="text-gray-600">Loading Users...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Registered</th>
              <th className="py-2 px-4">Orders</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td
                  className={`py-2 px-4 ${
                    user.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.status}
                </td>
                <td className="py-2 px-4">{user.registered}</td>
                <td className="py-2 px-4">{user.orders}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
