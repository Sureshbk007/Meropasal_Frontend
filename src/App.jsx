import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, setLoading } from "./store/slices/authSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(login({ user: JSON.parse(user), token }));
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer autoClose={4000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
