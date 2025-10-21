import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm) return toast.error("Please fill both fields");
    if (password !== confirm) return toast.error("Passwords do not match");

    try {
      await axios.post("/auth/reset-password", { email, token, password });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired link");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          className="w-full border border-gray-300 p-3 rounded mb-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border border-gray-300 p-3 rounded mb-4 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white py-2 sm:py-3 rounded hover:bg-green-700 transition text-sm sm:text-base">
          Save New Password
        </button>
      </form>
    </div>
  );
}
