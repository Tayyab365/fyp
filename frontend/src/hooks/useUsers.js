import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser) => {
    toast.dismiss();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add user");
      }

      setUsers([...users, data]);
      toast.success("User added successfully");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to add user");
    }
  };

  const deleteUser = async (_id) => {
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user._id !== _id));
      toast.success("User deleted successfully");
    } catch (err) {
      setError("Failed to delete user");
      toast.error("Failed to delete user");
    }
  };

  const editUser = async (_id, updatedUser) => {
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to edit user");
      const data = await res.json();
      setUsers(users.map((user) => (user._id === _id ? data : user)));
      toast.success("User updated successfully");
    } catch (err) {
      setError("Failed to edit user");
      toast.error("Failed to edit user");
    }
  };

  const toggleUserStatus = async (_id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
    const updatedUser = { status: newStatus };

    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update user status");

      const data = await res.json();

      setUsers((prev) => prev.map((user) => (user._id === _id ? data : user)));

      toast.success(
        `User ${newStatus === "Active" ? "unblocked" : "blocked"} successfully`
      );
    } catch (err) {
      setError("Failed to update user status");
      toast.error("Failed to update user status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    editUser,
    toggleUserStatus,
  };
}
