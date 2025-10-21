import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import { Pencil, Trash2, Lock, Unlock, RefreshCw } from "lucide-react";
import EditUser from "./EditUser";
import toast from "react-hot-toast";
import ResetPasswordModal from "./ResetPasswordModal";
import { useUsers } from "../../../hooks/useUsers";
import { useOrders } from "../../../hooks/useOrders";

const Users = () => {
  const { users, loading, error, deleteUser, toggleUserStatus } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [resetUserId, setResetUserId] = useState(null);
  const { fetchUserOrdersCount } = useOrders();
  const [orderCounts, setOrderCounts] = useState({});

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const counts = await fetchUserOrdersCount();
        const mapped = {};
        counts.forEach((item) => {
          mapped[item._id] = item.totalOrders;
        });
        setOrderCounts(mapped);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load order counts");
      }
    };
    loadCounts();
  }, [fetchUserOrdersCount]);

  if (loading)
    return <p className="text-gray-600 text-center mt-6">Loading Users...</p>;
  if (error)
    return (
      <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
        {error}
      </p>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition text-sm sm:text-base"
        >
          + Add User
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 max-w-[200px] overflow-hidden whitespace-nowrap">
                        <span className="font-medium text-gray-900 truncate">
                          {user.name}
                        </span>
                      </div>
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
                    <td className="py-3 px-4 text-center font-semibold text-gray-700">
                      {orderCounts[user._id] ?? 0}
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        title="Edit"
                        onClick={() => setEditUser(user)}
                        className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 shadow-sm transition"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        title={user.status === "Active" ? "Block" : "Unblock"}
                        onClick={() => toggleUserStatus(user._id, user.status)}
                        className={`p-1.5 text-white rounded-md shadow-sm active:scale-95 transition ${
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
                        title="Reset Password"
                        onClick={() => setResetUserId(user._id)}
                        className="p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 active:scale-95 shadow-sm transition"
                      >
                        <RefreshCw size={14} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => deleteUser(user._id)}
                        className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 shadow-sm transition"
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
      </div>

      {showModal && <AddUser onClose={() => setShowModal(false)} />}
      {editUser && (
        <EditUser user={editUser} onClose={() => setEditUser(null)} />
      )}
      <ResetPasswordModal
        userId={resetUserId}
        isOpen={!!resetUserId}
        onClose={() => setResetUserId(null)}
      />
    </div>
  );
};

export default Users;
