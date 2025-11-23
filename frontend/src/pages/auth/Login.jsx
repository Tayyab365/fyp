import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("Please fill all fields!");
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", formData);

      if (res.data.success) {
        toast.success("Login successful! 🎉");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userId", res.data.user.id);

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid credentials!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[var(--bg-elevated)] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300 border dark:border-[var(--border-color)]">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--text-primary)] mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-[var(--border-color)] bg-[var(--bg-section-light)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--accent-blue)] outline-none text-sm sm:text-base text-[var(--text-primary)]"
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-[var(--text-secondary)]">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[var(--accent-blue)]" />
            Remember Me
          </label>
          <Link
            to="/forgot-password"
            className="text-[var(--accent-blue)] hover:text-[var(--accent-hover)]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent-blue)] text-white py-3 rounded-lg hover:bg-[var(--accent-hover)] transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm sm:text-base text-gray-600 dark:text-[var(--text-secondary)]">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-[var(--accent-blue)] hover:text-[var(--accent-hover)]"
        >
          Sign up
        </Link>
      </p>

      <p className="text-center mt-2 text-sm sm:text-base text-gray-600 dark:text-[var(--text-secondary)]">
        Don't want to login?{" "}
        <Link to="/" className="text-[var(--accent-blue)]">
          Continue as Guest
        </Link>
      </p>
    </div>
  );
};

export default Login;
