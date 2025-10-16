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
