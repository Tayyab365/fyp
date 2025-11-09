import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.DEV
    ? `${import.meta.env.VITE_API_URL_LOCAL}/api`
    : `${import.meta.env.VITE_API_URL_PROD}/api`,
});

export default API;
