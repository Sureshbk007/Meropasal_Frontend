import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { lineSpinner } from "ldrs";
import { toast } from "react-toastify";
import { useEffect } from "react";
lineSpinner.register();

function ProtectedRoute({ role, children, requireCartCheck = false }) {
  const { isLogged, user, loading } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.orders);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!isLogged) {
      toast.warn("Login to checkout");
      navigate("/login");
    } else if (!role.includes(user.role)) {
      toast.warn("You are not Authorized to access this page");
      navigate("/");
    } else if (requireCartCheck && cart.length === 0) {
      toast.warn("Your cart is empty. Please add products to checkout.");
      navigate("/");
    }
  }, [isLogged, navigate, loading, role, cart, requireCartCheck]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <l-line-spinner size="25" stroke="2" speed="1" color="black" />
      </div>
    );
  }

  if (
    !isLogged ||
    !role.includes(user.role) ||
    (requireCartCheck && cart.length === 0)
  ) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
