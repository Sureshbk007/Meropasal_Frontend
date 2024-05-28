import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Login,
  Signup,
  PageNotFound,
  Home,
  ProductDetails,
  Products,
  Checkout,
} from "./pages";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:slug" element={<ProductDetails />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
