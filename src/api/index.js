import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const UserLogin = async (data) => await API.post("/auth/login", data);
export const UserRegister = async (data) =>
  await API.post("/auth/register", data);

export const getAllProducts = async (filter = "") =>
  await API.get(`/products${filter}`);
export const getProductDetails = async (slug) =>
  await API.get(`/products/${slug}`);

export const getAllCategory = async (filter = "") =>
  await API.get(`/category${filter}`);
