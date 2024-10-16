import axios from "axios";

const API = axios.create({
  baseURL: "https://meropasal-backend.onrender.com//api/v1",
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

// user api
export const userLogin = async (data) => await API.post("/auth/login", data);
export const userRegister = async (data) =>
  await API.post("/auth/register", data);
export const userUpdate = async (formData) =>
  await API.put("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getAllUsers = async () => await API.get("/users");

// product api
export const getAllProducts = async (filter = "") =>
  await API.get(`/products${filter}`);
export const getProductDetails = async (slug) =>
  await API.get(`/products/${slug}`);
export const createProduct = async (formData) =>
  await API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteProduct = async (id) =>
  await API.delete(`/products?id=${id}`);
export const updateProduct = async (id, formData) =>
  await API.put(`/products?id=${id}`, formData, { new: true });

// category api
export const getAllCategory = async (filter = "") =>
  await API.get(`/category${filter}`);
export const createCategory = async (formData) =>
  await API.post("/category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteCategory = async (id) =>
  await API.delete(`/category?id=${id}`);
export const updateCategory = async (id, formData) =>
  await API.put(`/category?id=${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// order api
export const getAllOrders = async () => await API.get("/orders");
export const getUserOrders = async () => await API.get("/orders/my-orders");
export const createOrder = async (data) =>
  await API.post("/orders/create", data);
