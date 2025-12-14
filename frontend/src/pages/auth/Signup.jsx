import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // ✅ Password validation checks
  const passwordValidation = {
    minLength: formData.password.length >= 6,
    hasNumber: /\d/.test(formData.password),
  };

  const isPasswordValid =
    passwordValidation.minLength && passwordValidation.hasNumber;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    // Validation checks
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required!");
    }

    if (!passwordValidation.minLength) {
      return toast.error("Password must be at least 6 characters!");
    }

    if (!passwordValidation.hasNumber) {
      return toast.error("Password must contain at least one number!");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/signup", formData);

      if (res.data.success) {
        toast.success("Verification code sent to your email!");
        navigate(`/verify-email?email=${res.data.email}`);
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-[var(--bg-elevated)] p-6 sm:px-8 sm:py-5 rounded-lg shadow border dark:border-[var(--border-color)] transition-colors duration-300">
      <h2 className="!text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-[var(--text-primary)]">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-light)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] outline-none text-sm sm:text-base text-[var(--text-primary)]"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-light)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] outline-none text-sm sm:text-base text-[var(--text-primary)]"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[var(--border-color)] bg-[var(--bg-section-light)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] outline-none text-sm sm:text-base text-[var(--text-primary)] pr-10"
              disabled={loading}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[var(--text-muted)] cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* ✅ Password Requirements Checklist */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                {passwordValidation.minLength ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
                <span
                  className={
                    passwordValidation.minLength
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  At least 6 characters
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {passwordValidation.hasNumber ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <X size={16} className="text-red-500" />
                )}
                <span
                  className={
                    passwordValidation.hasNumber
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  Contains at least one number
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || (formData.password && !isPasswordValid)}
          className="w-full bg-[var(--accent-blue)] text-white py-3 rounded-lg hover:bg-[var(--accent-hover)] transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm sm:text-base text-gray-600 dark:text-[var(--text-secondary)]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[var(--accent-blue)] hover:text-[var(--accent-hover)]"
        >
          Login
        </Link>
      </p>

      <p className="text-center mt-2 text-sm sm:text-base text-gray-600 dark:text-[var(--text-secondary)]">
        Don't want to Signup?{" "}
        <Link to="/" className="text-[var(--accent-blue)]">
          Continue as Guest
        </Link>
      </p>
    </div>
  );
};

export default Signup;
