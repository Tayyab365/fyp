import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔹 Single state for both fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🔹 Dynamic handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await login(formData);
      toast.success("Login successful!");
      console.log("User after login:", res.user);

      // Example: token/user handle if needed later
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("userId", res.user.id);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Invalid credentials!");
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600" />
            Remember Me
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
    // </div>
  );
};

export default Login;
