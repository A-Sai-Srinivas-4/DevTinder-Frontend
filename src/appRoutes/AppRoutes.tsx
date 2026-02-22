import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AppLayout from "../layout/AppLayout";
import Feed from "@/pages/Feed";
import Connections from "@/pages/Connections";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Requests from "@/pages/Requests";
import SignUp from "@/pages/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<AppLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
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
