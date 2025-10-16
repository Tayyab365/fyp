import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/users";

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
      console.error(err);
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
      if (!res.ok) throw new Error("Failed to add User");
      const data = await res.json();
      setUsers([...users, data]);
      toast.success("User added successfully");
    } catch (err) {
      console.log(err);
      setError("Failed to add User");
      toast.error("Failed to add User");
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
      console.log(err);
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
      console.log(err);
      setError("Failed to edit user");
      toast.error("Failed to edit user");
    }
  };

  const toggleUserStatus = async (_id, currentStatus) => {
    const updateStatus = currentStatus === "Active" ? "Block" : "Active";
    const updatedUser = { status: updateStatus };
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to update user status");
      const data = await res.json();
      setUsers(users.map((user) => (user._id === _id ? data : user)));
      toast.success(
        `User ${
          updateStatus === "Active" ? "Unblocked" : "Blocked"
        } successfully`
      );
    } catch (err) {
      console.log(err);
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
