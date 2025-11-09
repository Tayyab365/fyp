import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.DEV
    ? `${import.meta.env.VITE_API_URL_LOCAL}`
    : `${import.meta.env.VITE_API_URL_PROD}`,
});

export default API;
