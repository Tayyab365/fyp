import API from "../api/axios";

// Signup API call
export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Login API call
export const login = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    const data = response.data;

    // ✅ Store user info + token in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to change password");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
