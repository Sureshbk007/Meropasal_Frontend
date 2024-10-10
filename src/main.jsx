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
  Categories,
  Dashboard,
  Orders,
} from "./pages";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ProtectedRoute } from "./components/index.js";
import Admin from "./pages/Admin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="categories" element={<Categories />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:slug" element={<ProductDetails />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute role={["USER", "ADMIN"]} requireCartCheck>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute role={["USER", "ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute role={["USER", "ADMIN"]}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin"
        element={
          <ProtectedRoute role={["USER", "ADMIN"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
