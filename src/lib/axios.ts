import axios from "axios";

const api = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default api;
