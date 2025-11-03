import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email) return toast.error("Please enter your email");
  //   setLoading(true);
  //   try {
  //     await axios.post("/auth/forgot-password", { email });
  //     toast.success("If that email exists, a reset link has been sent.");
  //   } catch {
  //     toast.error("Something went wrong.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    // ✅ Directly navigate to reset password page (no email sent)
    navigate(`/reset-password?email=${email}`);
  };

  return (
    <div
      className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-[var(--bg-elevated)]
      rounded-lg shadow border dark:border-[var(--border-color)]
      transition-colors duration-300"
    >
      <h2 className="!text-2xl font-bold mb-4 text-center text-gray-800 dark:text-[var(--text-primary)]">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full border p-3 rounded mb-4
          bg-white dark:bg-[var(--bg-card)]
          text-gray-900 dark:text-[var(--text-primary)]
          border-gray-300 dark:border-[var(--border-color)]
          focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded
          hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
