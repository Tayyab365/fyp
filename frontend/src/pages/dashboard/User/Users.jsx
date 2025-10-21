import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import ResetPasswordModal from "./ResetPasswordModal";
import { Pencil, Trash2, Lock, Unlock, RefreshCw } from "lucide-react";
import { useUsers } from "../../../hooks/useUsers";
import { useOrders } from "../../../hooks/useOrders";
import toast from "react-hot-toast";

const Users = () => {
  const { users, loading, error, deleteUser, toggleUserStatus } = useUsers();
  const { fetchUserOrdersCount } = useOrders();
  const [orderCounts, setOrderCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [resetUserId, setResetUserId] = useState(null);

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
    <div className="bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition text-sm sm:text-base"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Email</th>
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-center">Orders</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-5 text-gray-500">{index + 1}</td>
                    <td className="py-3 px-5 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="py-3 px-5">{user.email}</td>
                    <td className="py-3 px-5">
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
                    <td className="py-3 px-5">
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
                    <td className="py-3 px-5 text-center font-semibold">
                      {orderCounts[user._id] ?? 0}
                    </td>
                    <td className="py-3 px-5 flex justify-center gap-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-95 transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user._id, user.status)}
                        className={`p-1.5 text-white rounded-md active:scale-95 transition ${
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
                        onClick={() => setResetUserId(user._id)}
                        className="p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 active:scale-95 transition"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
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
