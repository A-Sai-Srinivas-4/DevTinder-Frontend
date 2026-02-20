import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AppLayout from "../layout/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
