import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AppLayout from "../layout/AppLayout";
import Feed from "@/pages/Feed";
import Connections from "@/pages/Connections";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Requests from "@/pages/Requests";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
