import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toggleCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(toggleCart(false));
      toast.warn("Login to checkout");
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
