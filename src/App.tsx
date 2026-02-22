import { api } from "@/services/api";
import { endpoints } from "@/utils/endpoints";
import { useAppDispatch } from "@/appStore/hooks";
import {
  logout,
  setUser,
  authCheckComplete,
} from "@/appStore/slices/authSlice";
import { useEffect } from "react";
import AppRoutes from "./appRoutes/AppRoutes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get(endpoints.profile);
        dispatch(setUser(res.data?.data));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(authCheckComplete());
      }
    };

    checkAuth();
  }, []);

  return <AppRoutes />;
}

export default App;
