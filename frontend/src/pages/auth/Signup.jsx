import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { signup } from "../../hooks/useAuth";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const res = await signup(formData);
      if (res.success) {
        toast.success("Verification code sent to your email!");
        localStorage.setItem("pendingEmail", res.email);
        navigate(`/verify-email?email=${res.email}`);
        // toast.success("Signup successful! You can now login.");
        // navigate("/login");
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Server error, please try again");
    }
  };

  return (
    <div
      className="w-full max-w-md bg-white dark:bg-[var(--bg-elevated)]
      p-6 sm:px-8 sm:py-5 rounded-lg shadow border dark:border-[var(--border-color)]
      transition-colors duration-300"
    >
      <h2 className="!text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-[var(--text-primary)]">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
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
          />
        </div>

        {/* Email */}
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
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[var(--border-color)] bg-[var(--bg-section-light)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] outline-none text-sm sm:text-base text-[var(--text-primary)] pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[var(--text-muted)] cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-[var(--accent-blue)] text-white py-3 rounded-lg hover:bg-[var(--accent-hover)] transition text-sm sm:text-base"
        >
          Sign Up
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
      <p className="text-center mt-4 text-sm sm:text-base text-gray-600 dark:text-[var(--text-secondary)]">
        Don’t want to Signup?{" "}
        <Link to="/" className="text-[var(--accent-blue)]">
          Continue as Guest
        </Link>
      </p>
    </div>
  );
};

export default Signup;
