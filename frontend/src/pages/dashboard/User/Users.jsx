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
    return (
      <p className="text-[var(--text-secondary)] text-center mt-6">
        Loading Users...
      </p>
    );
  if (error)
    return (
      <p className="text-red-400 text-sm bg-[var(--bg-card)] border border-[var(--border-color)] p-2 rounded-lg text-center">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen space-y-8 text-[var(--text-primary)]">
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Users</h1>
        {/* <button
          onClick={() => setShowModal(true)}
          className="bg-[var(--accent-blue)] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-[var(--accent-hover)] active:scale-95 shadow-sm transition text-sm sm:text-base"
        >
          + Add User
        </button> */}
      </div>

      <div className="rounded-2xl shadow-md border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#2a2a3a] scrollbar-track-[#000000]">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] uppercase text-xs font-semibold tracking-wider">
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
            <tbody className="text-[var(--text-secondary)]">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t border-[var(--border-color)] hover:bg-[var(--bg-section-dark)] transition-colors duration-200"
                  >
                    <td className="py-3 px-5 text-[var(--text-muted)]">
                      {index + 1}
                    </td>
                    <td className="py-3 px-5 font-medium text-[var(--text-primary)]">
                      {user.name}
                    </td>
                    <td className="py-3 px-5">{user.email}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-gray-200 text-gray-700 dark:bg-[var(--bg-elevated)] dark:text-[var(--text-secondary)]"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center font-semibold text-[var(--text-primary)]">
                      {orderCounts[user._id] ?? 0}
                    </td>
                    <td className="py-3 px-5 flex justify-center gap-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="p-1.5 bg-[var(--accent-blue)] text-white rounded-md hover:bg-[var(--accent-hover)] active:scale-95 transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user._id, user.status)}
                        className={`p-1.5 text-white rounded-md active:scale-95 transition ${
                          user.status === "Active"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-600 hover:bg-green-700"
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
                        className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 active:scale-95 transition"
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
                    className="text-center py-8 text-[var(--text-muted)] italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* {showModal && <AddUser onClose={() => setShowModal(false)} />} */}
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
