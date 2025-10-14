import React, { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import AddUser from "./AddUser";
import { Pencil, Trash2, Lock, Unlock, RefreshCw } from "lucide-react";

const Users = () => {
  const { users, loading, error, deleteUser } = useUsers();
  const [showModal, setShowModal] = useState(false);

  if (loading) return <p className="text-gray-600">Loading Users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition"
        >
          + Add User
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Registered</th>
              <th className="py-3 px-4 text-center">Orders</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-blue-50/50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    <span className="truncate">{user.name}</span>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {user.registered || "—"}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-gray-700">
                    {user.orders || 0}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button
                      title="Edit"
                      className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      title={user.status === "Active" ? "Block" : "Unblock"}
                      className={`p-1.5 text-white rounded-md transition ${
                        user.status === "Active"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <Lock size={14} />
                      ) : (
                        <Unlock size={14} />
                      )}
                    </button>
                    <button
                      title="Reset password"
                      className="p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => deleteUser(user.id)}
                      className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && <AddUser onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Users;
