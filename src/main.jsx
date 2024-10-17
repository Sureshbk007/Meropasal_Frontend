import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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

// Lazy load the page components
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
// const Admin = lazy(() => import("./pages/Admin.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

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
      {/* Suspense provides a fallback UI while lazy components are loading */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen animate-pulse">
            Loading...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
