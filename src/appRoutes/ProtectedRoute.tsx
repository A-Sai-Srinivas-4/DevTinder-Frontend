import { useAppSelector } from "@/appStore/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, authChecked } = useAppSelector((state) => state.auth);

  if (!authChecked) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
