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
      await axios.post("/auth/reset-password", { email, password }); // token b likhna ha email or password k sath agr verification wala krna ha to
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow
      bg-white dark:bg-[var(--bg-elevated)]
      border dark:border-[var(--border-color)]
      transition-colors duration-300"
    >
      <h2
        className="!text-2xl sm:text-3xl font-bold mb-4 text-center
        text-gray-800 dark:text-[var(--text-primary)]"
      >
        Reset Password
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          className="w-full border p-3 rounded mb-3 text-sm sm:text-base
          bg-white dark:bg-[var(--bg-card)]
          text-gray-900 dark:text-[var(--text-primary)]
          border-gray-300 dark:border-[var(--border-color)]
          focus:ring-2 focus:ring-[var(--accent-blue)] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full border p-3 rounded mb-4 text-sm sm:text-base
          bg-white dark:bg-[var(--bg-card)]
          text-gray-900 dark:text-[var(--text-primary)]
          border-gray-300 dark:border-[var(--border-color)]
          focus:ring-2 focus:ring-[var(--accent-blue)] outline-none"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
          Save New Password
        </button>
      </form>
    </div>
  );
}
