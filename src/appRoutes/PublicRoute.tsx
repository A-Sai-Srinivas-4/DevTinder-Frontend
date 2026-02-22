import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/appStore/hooks";

const PublicRoute = () => {
  const { user, authChecked } = useAppSelector((state) => state.auth);

  if (!authChecked) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
