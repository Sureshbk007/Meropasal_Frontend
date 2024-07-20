import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch(login({ user: JSON.parse(user), token }));
    }
  });
  return (
    <>
      {ReactDOM.createPortal(
        <ToastContainer autoClose={4000} position="top-right" />,
        document.body
      )}
      <Outlet />
    </>
  );
}

export default App;
