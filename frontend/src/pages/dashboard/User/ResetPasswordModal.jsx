import { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordModal = ({ userId, isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleReset = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/reset-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      toast.success("Password reset successfully ✅");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-0">
      <div
        className="bg-white dark:bg-[var(--bg-section-dark)] 
                      text-gray-900 dark:text-[var(--text-primary)] 
                      border border-gray-200 dark:border-[var(--border-color)] 
                      rounded-xl shadow-lg p-6 w-full max-w-sm relative"
      >
        <h2
          className="text-xl font-semibold mb-4 
                       text-gray-800 dark:text-[var(--text-primary)] 
                       text-center"
        >
          Reset User Password
        </h2>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Enter new password"
            className="border border-gray-300 dark:border-[var(--border-color)] 
                       bg-white dark:bg-[var(--bg-card)] 
                       text-gray-900 dark:text-[var(--text-primary)] 
                       rounded-lg w-full p-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-[var(--accent-blue)]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="border border-gray-300 dark:border-[var(--border-color)] 
                       bg-white dark:bg-[var(--bg-card)] 
                       text-gray-900 dark:text-[var(--text-primary)] 
                       rounded-lg w-full p-2 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-[var(--accent-blue)]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-[var(--bg-elevated)] 
                       dark:text-[var(--text-secondary)] rounded-lg 
                       hover:bg-gray-300 dark:hover:bg-[var(--bg-card)] 
                       transition"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 dark:bg-[var(--accent-blue)] 
                       text-white rounded-lg hover:bg-indigo-700 
                       dark:hover:bg-[var(--accent-hover)] 
                       disabled:opacity-50 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
