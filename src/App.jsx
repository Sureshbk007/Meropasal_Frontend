import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "./store/slices/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/auth/", {
          method: "POST",
          withCredentials: true,
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
          navigate("/");
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer autoClose={4000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
