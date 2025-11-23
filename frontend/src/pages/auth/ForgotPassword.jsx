import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!email) {
      return toast.error("Please enter your email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/forgot-password", { email });

      if (res.data.success) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-[var(--bg-elevated)] rounded-lg shadow border dark:border-[var(--border-color)] transition-colors duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)] mb-2">
            Check Your Email! 📧
          </h2>

          <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm">
            We've sent a password reset link to:
          </p>
          <p className="text-gray-900 dark:text-[var(--text-primary)] font-semibold mt-2 break-all">
            {email}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Click the link in the email to reset your password. The link will
            expire in 1 hour.
          </p>
        </div>

        <div className="text-center space-y-3">
          <p className="text-gray-500 dark:text-[var(--text-muted)] text-sm">
            Didn't receive the email?
          </p>
          <button
            onClick={() => {
              setEmailSent(false);
              setEmail("");
            }}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Try again
          </button>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-gray-600 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-[var(--text-primary)] text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-[var(--bg-elevated)] rounded-lg shadow border dark:border-[var(--border-color)] transition-colors duration-300">
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

        <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)] mb-2">
          Forgot Password?
        </h2>

        <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm">
          No worries! Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2 text-sm">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border p-3 rounded-lg bg-white dark:bg-[var(--bg-card)] text-gray-900 dark:text-[var(--text-primary)] border-gray-300 dark:border-[var(--border-color)] focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
