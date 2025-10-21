import React, { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import toast from "react-hot-toast";

const EditUser = ({ onClose, user }) => {
  const { editUser } = useUsers();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(user._id, form);
      onClose();
    } catch (err) {
      console.error("Edit user failed:", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-0">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Edit User
        </h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-50"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-50"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-50"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
