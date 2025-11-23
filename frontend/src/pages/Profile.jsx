import React, { useEffect, useState } from "react";
import ChangePasswordModal from "../components/Profile/ChangePasswordModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[var(--bg-page)]">
        <p className="text-gray-500 dark:text-[var(--text-secondary)] text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[var(--bg-page)]">
        <p className="text-gray-500 dark:text-[var(--text-secondary)] text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center 
                    bg-[#F6F8FB] dark:bg-[var(--bg-page)] 
                    px-3 py-8 sm:py-0 text-gray-900 dark:text-[var(--text-primary)]"
    >
      <div
        className="w-full sm:w-[750px] 
                      bg-white dark:bg-[var(--bg-section-dark)] 
                      rounded-3xl shadow-xl flex flex-col sm:flex-row 
                      overflow-hidden border border-gray-100 dark:border-[var(--border-color)]"
      >
        {/* Left Section */}
        <div
          className="sm:w-1/3 w-full bg-gradient-to-b from-blue-600 to-blue-500 
                        flex flex-col justify-center items-center text-white p-6"
        >
          <div
            className="w-24 h-24 bg-white text-blue-600 rounded-full 
                          flex items-center justify-center text-4xl font-bold mb-4 shadow-md"
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-center break-words">
            {user.name}
          </h2>
          <p className="text-blue-100 text-sm text-center break-words">
            {user.email}
          </p>
          <span className="mt-3 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
            {user.role}
          </span>
        </div>

        {/* Right Section */}
        <div className="sm:w-2/3 w-full flex flex-col justify-center p-6 sm:p-10">
          <h3
            className="text-2xl font-bold text-gray-800 dark:text-[var(--text-primary)] 
                         mb-6 border-b-2 border-blue-500 dark:border-[var(--accent-blue)] 
                         pb-2 text-center sm:text-left"
          >
            Profile Overview
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 dark:text-[var(--text-secondary)]">
            <div>
              <p className="text-sm text-gray-500 dark:text-[var(--text-muted)]">
                Full Name
              </p>
              <p className="font-semibold break-words">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-[var(--text-muted)]">
                Email
              </p>
              <p className="font-semibold break-words">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-[var(--text-muted)]">
                Role
              </p>
              <p className="font-semibold">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-[var(--text-muted)]">
                Member Since
              </p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-[var(--text-muted)]">
                Country
              </p>
              <p className="font-semibold">Pakistan</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* <button
              onClick={() => alert("Edit feature coming soon!")}
              className="bg-blue-600 hover:bg-blue-700 
                         dark:bg-[var(--accent-blue)] dark:hover:bg-[var(--accent-hover)] 
                         text-white px-5 py-2 rounded-lg font-semibold transition w-full sm:w-auto"
            >
              Edit Profile
            </button> */}
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="border border-blue-600 text-blue-600 
                         dark:border-[var(--accent-blue)] 
                         hover:bg-[#2563EB] hover:text-white dark:hover:bg-transparent 
                         px-5 py-2 text-sm rounded-lg font-semibold transition w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
