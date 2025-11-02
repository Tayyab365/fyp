import axios from "axios";

const API = axios.create({
  baseURL: "https://tayyab-fyp-backend.onrender.com",
});

export default API;
