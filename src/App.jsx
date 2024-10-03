import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, setLoading } from "./store/slices/authSlice";
import { getAllCategory, getAllProducts } from "./api";
import { addCategory, addProducts } from "./store/slices/storeSlice";
function App() {
  const dispatch = useDispatch();

  const fetchAllCategory = async () => {
    try {
      const response = await getAllCategory();
      dispatch(addCategory(response.data.data));
    } catch (error) {
      console.log("failed to fetch categories");
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      dispatch(addProducts(response.data.data));
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      await Promise.all([fetchAllCategory(), fetchAllProducts()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(login({ user: JSON.parse(user), token }));
    } else {
      dispatch(setLoading(false));
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <ToastContainer autoClose={4000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
