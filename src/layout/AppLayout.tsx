import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";
import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useAppDispatch, useAppSelector } from "@/appStore/hooks";
import { setUser } from "@/appStore/slices/authSlice";
import { useEffect } from "react";
import { AxiosError } from "axios";

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await api.get(endpoints.profile);

      dispatch(setUser(res.data?.data));
    } catch (error: unknown) {
      if ((error as AxiosError).response?.status === 401)
        return navigate("/login");
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
