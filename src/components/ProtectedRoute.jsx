import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isLogged);
  const cartItems = useSelector((state) => state.cart.orders);
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Login to checkout");
    } else if (!cartItems.length > 0) {
      toast.warn("Cart is Empty");
    }
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (!cartItems.length > 0) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
