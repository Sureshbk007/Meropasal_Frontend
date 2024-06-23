import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} position="top-right" />
      <Outlet />
    </>
  );
}

export default App;
