import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!email || !token) {
      return toast.error("Invalid reset link");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/reset-password", {
        email,
        token,
        password,
      });

      if (res.data.success) {
        toast.success("Password reset successful! 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-[var(--bg-elevated)] rounded-lg shadow border dark:border-[var(--border-color)] transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)] mb-2">
            Invalid Reset Link
          </h2>

          <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm mb-6">
            This password reset link is invalid or has expired.
          </p>

          <Link
            to="/forgot-password"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow bg-white dark:bg-[var(--bg-elevated)] border dark:border-[var(--border-color)] transition-colors duration-300">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-[var(--text-primary)] mb-2">
          Reset Password
        </h2>

        <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm">
          Enter your new password below
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-[var(--bg-card)] p-3 rounded-lg mb-6">
        <p className="text-gray-600 dark:text-[var(--text-secondary)] text-xs text-center">
          Resetting password for:
        </p>
        <p className="text-gray-900 dark:text-[var(--text-primary)] font-semibold text-center mt-1 break-all text-sm">
          {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2 text-sm">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Min. 6 characters"
              className="w-full border p-3 rounded-lg bg-white dark:bg-[var(--bg-card)] text-gray-900 dark:text-[var(--text-primary)] border-gray-300 dark:border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-blue)] outline-none pr-10"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[var(--text-muted)] cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2 text-sm">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              className="w-full border p-3 rounded-lg bg-white dark:bg-[var(--bg-card)] text-gray-900 dark:text-[var(--text-primary)] border-gray-300 dark:border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-blue)] outline-none pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-[var(--text-muted)] cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-blue-800 dark:text-blue-200 text-xs">
            Password must be at least 6 characters long
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link
          to="/login"
          className="text-gray-600 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-[var(--text-primary)] text-sm inline-flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
