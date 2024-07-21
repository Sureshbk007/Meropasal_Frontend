import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { lineSpinner } from "ldrs";
lineSpinner.register();

function ProtectedRoute({ children }) {
  const { isLogged, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <l-line-spinner size="25" stroke="2" speed="1" color="black" />;
      </div>
    );
  }
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
