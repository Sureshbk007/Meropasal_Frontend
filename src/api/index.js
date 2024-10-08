import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userLogin = async (data) => await API.post("/auth/login", data);
export const userRegister = async (data) =>
  await API.post("/auth/register", data);
export const userUpdate = async (formData) =>
  await API.put("/user/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllProducts = async (filter = "") =>
  await API.get(`/products${filter}`);
export const getProductDetails = async (slug) =>
  await API.get(`/products/${slug}`);

export const getAllCategory = async (filter = "") =>
  await API.get(`/category${filter}`);

export const createOrder = async (data) =>
  await API.post("/orders/create", data);
