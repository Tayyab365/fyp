import React, { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import toast from "react-hot-toast";

const AddUser = ({ onClose }) => {
  const { addUser } = useUsers();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.role ||
      !form.status
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await addUser(form);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "",
        status: "",
      });
      onClose();
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-0">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto border border-[var(--border-color)]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--text-primary)]">
          Add New User
        </h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xl"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="password"
            placeholder="Password"
            type="text"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Block">Block</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[var(--accent-blue)] text-white py-2 rounded hover:bg-[var(--accent-hover)] transition"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
