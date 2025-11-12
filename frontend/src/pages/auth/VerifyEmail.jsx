import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!code.trim()) {
      return toast.error("Please enter the verification code");
    }

    if (code.length !== 6) {
      return toast.error("Code must be 6 digits");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/verify-email", { email, code });

      if (res.data.success) {
        toast.success("Email verified successfully! 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 min-h-screen">
      <div className="p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md bg-white dark:bg-[var(--bg-elevated)] border dark:border-[var(--border-color)] transition-colors duration-300">
        {/* Header */}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)]">
            Verify Your Email
          </h2>
        </div>

        {/* Email Display */}
        <div className="bg-gray-50 dark:bg-[var(--bg-card)] p-4 rounded-lg mb-6">
          <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm sm:text-base text-center">
            We've sent a 6-digit verification code to:
          </p>
          <p className="text-gray-900 dark:text-[var(--text-primary)] font-semibold text-center mt-2 break-all">
            {email}
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-[var(--text-secondary)] font-medium mb-2 text-sm">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 6) {
                  setCode(value);
                }
              }}
              onPaste={handlePaste}
              placeholder="000000"
              maxLength={6}
              className="w-full border p-3 rounded-lg text-center text-2xl tracking-widest font-bold bg-white dark:bg-[var(--bg-card)] text-gray-900 dark:text-[var(--text-primary)] border-gray-300 dark:border-[var(--border-color)] focus:ring-2 focus:ring-blue-600 outline-none"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-[var(--text-muted)] text-sm">
            Didn't receive the code?
          </p>
          <p className="text-gray-500 dark:text-[var(--text-muted)] text-xs mt-2">
            Check your spam folder or{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              sign up again
            </Link>
          </p>
        </div>

        {/* Code expires info */}
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-xs text-center">
            ⏰ This code will expire in 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
